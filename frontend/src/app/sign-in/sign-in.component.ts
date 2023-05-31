import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  username!: string;
  password!: string;
  signinForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
    ){}

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // Implement your sign-in logic here
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm?.value).subscribe(
        response => {
          if (response.access_token) {
            localStorage.setItem('access_token', response.access_token); // Store the access_token in local storage
            this.router.navigate(['/emails']);
          }
      });
    }
  }
}
