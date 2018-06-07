import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ValidationMessagesService } from '../validation-messages/validation-messages.service';
import { environment } from '../../../environments/environment';
import * as AWS from 'aws-sdk';

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

          const creds = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.aws_identity_pool_id
          });
          AWS.config.update({
              region: environment.region,
              credentials: creds
          });

          const paramsIdentityPool = {
            IdentityPoolId: environment.aws_identity_pool_id
          };
          const cognitoidentity = new AWS.CognitoIdentity({credentials: AWS.config.credentials});
          cognitoidentity.getId(paramsIdentityPool, function(err, data) {
            const paramsIdentityId = {
              IdentityId: data.IdentityId
            };
            cognitoidentity.getCredentialsForIdentity(paramsIdentityId, function(errIdentityId, dataIdentityId) {
                console.log(dataIdentityId);
                debugger;
                this.authService.setIdentity(dataIdentityId);
                this.isSubmitted = false;
                this.router.navigate(['s3-sandbox']);
            });
          });
        }).catch((err) => {
          console.error('Error occurred when logging in: ', err);
          this.isSubmitted = false;
          this.loginFailed = true;
          this.firebaseErrorMessage = err.message;
        });
      }
    }

}
