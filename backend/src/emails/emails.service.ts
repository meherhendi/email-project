import { SES } from '@aws-sdk/client-ses';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Email } from 'src/models/email.model';
import { EmailIds } from './emailids.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(EmailIds)
    private emailRepository: Repository<EmailIds>,
    private configService: ConfigService,
  ) {}

  async sendEmail(
    to: string,
    subject: string,
    body: string,
    repliedToEmailId: string,
  ): Promise<void> {
    const payload = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: body,
          },
        },
      },
      Source: this.configService.get<string>('email'),
    };

    const ses = new SES({
      region: 'us-west-1',
      endpoint: 'http://localstack:4566',
      credentials: {
        accessKeyId: this.configService.get<string>('accessKeyId'),
        secretAccessKey: this.configService.get<string>('secretAccessKey'),
      },
    });

    const emailResponse: { senderEmail: string; repliedToEmailId: string } = {
      senderEmail: '',
      repliedToEmailId: '',
    };
    emailResponse.senderEmail = payload.Source;
    emailResponse.repliedToEmailId = repliedToEmailId;
    if (
      await this.checkIfEmailWasRepliedTo(
        emailResponse.senderEmail,
        emailResponse.repliedToEmailId,
      ) === false
    ) {
      const emailResponseEntity = await this.emailRepository.create(
        emailResponse,
      );
      await this.emailRepository.save(emailResponseEntity);
      await ses.sendEmail(payload);
    } else {
      throw new HttpException('email was already replied to', HttpStatus.CONFLICT);
    }
  }

  // returns true if email was replied to, false otherwise
  async checkIfEmailWasRepliedTo(
    senderEmail: string,
    repliedToEmailId: string,
  ): Promise<boolean> {
    const email = await this.emailRepository.findOne({
      where: { senderEmail, repliedToEmailId },
    });
    // Returns true if email is found, false otherwise
    return email ? true : false;
  }
}
