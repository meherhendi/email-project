import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { EmailsService } from './emails.service';
import { ConfigService } from '@nestjs/config';

@Controller('emails')
export class EmailsController {
  constructor(
    private httpService: HttpService,
    private emailsService: EmailsService,
    private configService: ConfigService,
  ) {}

  // this endpoint fetches all the emails for the authenticated user
  @UseGuards(AuthGuard)
  @Get('')
  async getEmails() {
    const url = 'http://localstack:4566/_localstack/ses';
    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data.messages.filter(
        (email) => email.Source !== this.configService.get<string>('email'),
      );
    } catch (error) {
      // Handle the error here if the aws ses does not respond
      console.error('Failed to fetch emails:', error);
      throw new Error('Failed to fetch emails');
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getEmailById(@Param('id') id: string) {
    const url = 'http://localstack:4566/_localstack/ses';
    try {
      const { data } = await firstValueFrom(this.httpService.get(url));
      if (data.messages) {
        const email = data.messages.find((message) => message.Id === id);
        if (email) {
          if (await this.emailsService.checkIfEmailWasRepliedTo(this.configService.get<string>('email'), id) ) {
            email.canReply = false;
            return email;
          } else {
            email.canReply = true;
            return email;
          }

        } else {
          throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
        }
      }
    } catch (error) {
      // Handle the error here if the aws ses does not respond
      console.error('Failed to fetch email:', error);
      throw new Error('Failed to fetch email');
    }
  }

  @UseGuards(AuthGuard)
  @Post('/send-mail')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('body') body: string,
    @Body('repliedToEmailId') repliedToEmailId: string,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      await this.emailsService.sendEmail(to, subject, body, repliedToEmailId);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  }
}
