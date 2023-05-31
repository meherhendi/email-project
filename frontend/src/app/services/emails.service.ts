import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  api_url = environment.api_url
  emails_endpoint = '/emails/'
  send_emails_endpoint = '/emails/send-mail'

  constructor(private http: HttpClient) { }

  getEmail(id: string) {
    return this.http.get<any>(this.api_url + this.emails_endpoint + id);
  }

  sendReply(payload: any) {
    return this.http.post<any>(this.api_url + this.send_emails_endpoint, payload)
  }
}
