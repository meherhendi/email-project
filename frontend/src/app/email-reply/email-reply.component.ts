import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { EmailsService } from '../services/emails.service';
import { Email } from '../models/email.model';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.scss']
})
export class EmailReplyComponent implements OnInit {
  id!: string | null;
  email!: Email;
  replyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private emailsService: EmailsService,
    private router: Router
    ) {
    this.replyForm = this.formBuilder.group({
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.emailsService.getEmail(this.id).subscribe((response: Email) => {
      this.email = response
    })
    
  }

  submitReply() {
    if (this.replyForm.valid) {
      const replyData = this.replyForm.value;
      replyData.to = this.email.Source;
      replyData.repliedToEmailId = this.email.Id;
      this.emailsService.sendReply(replyData).subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/emails']);
        }
      })
      
    }
  }
}
