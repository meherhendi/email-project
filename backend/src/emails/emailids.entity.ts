import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
// make combination of senderEmail and repliedToEmailId so that user can reply to an email only once
@Index(['senderEmail', 'repliedToEmailId'], { unique: true })
export class EmailIds {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  senderEmail: string;

  @Column('varchar')
  repliedToEmailId: string;
}
