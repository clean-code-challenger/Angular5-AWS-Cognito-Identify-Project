import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ValidationMessagesService } from '../validation-messages/validation-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isSubmitted: boolean;
  public loginForm: FormGroup;
  public firebaseErrorMessage: string;
  public loginFailed: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
      this.isSubmitted = false;
      this.loginFailed = false;
      this.loginForm = this.formBuilder.group({
        'email': ['', [Validators.required, ValidationMessagesService.emailValidator]],
        'password': ['', [Validators.required]]
      });
  }

  ngOnInit() {
  }

  public submitForm() {
    this.loginFailed = false;
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.isSubmitted = true;
      const email = this.loginForm.controls['email'].value;
      const password = this.loginForm.controls['password'].value;

      this.authService.signInRegular(email, password).then((res) => {
          console.log('Successfully logged in: ', res);
          this.isSubmitted = false;
          this.router.navigate(['tickets']);
        }).catch((err) => {
          console.error('Error occurred when logging in: ', err);
          this.isSubmitted = false;
          this.loginFailed = true;
          this.firebaseErrorMessage = err.message;
        });
      }
    }

}
