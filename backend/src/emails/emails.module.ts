import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailIds } from './emailids.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([EmailIds])],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
