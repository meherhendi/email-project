import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = environment.api_url
  login_endpoint = '/auth/login'

  constructor(private http: HttpClient) { }

  signIn(payload: any) {
    return this.http.post<any>(this.api_url + this.login_endpoint, {username: payload.username, password: payload.password});
  }
}
