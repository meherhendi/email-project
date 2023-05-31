import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EmailsComponent } from './emails/emails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AuthInterceptor } from './auth.interceptor';
import { EmailReplyComponent } from './email-reply/email-reply.component';
import { EmailHidePipe } from './services/email-hide.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    EmailsComponent,
    EmailReplyComponent,
    EmailHidePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
