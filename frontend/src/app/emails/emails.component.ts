import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Email } from '../models/email.model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent {
  emails: Email[] = [];
  displayedColumns: string[] = ['sender', 'subject', 'date'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEmails();
  }

  getEmails(): void {
    this.http.get<Email[]>(environment.api_url + '/emails').subscribe(
      emails => {
        this.emails = emails;
      },
      error => {
        alert('error fetching emails')
      }
    );
  }
}
