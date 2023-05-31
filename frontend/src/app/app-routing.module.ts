import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { EmailsComponent } from './emails/emails.component';
import { EmailReplyComponent } from './email-reply/email-reply.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '', component: SignInComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'emails', component: EmailsComponent },
  { path: 'emails/:id', component: EmailReplyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
