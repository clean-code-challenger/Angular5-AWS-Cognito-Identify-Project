import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as auth0 from 'auth0-js';
import * as AWS from 'aws-sdk';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';

(window as any).global = window;

@Injectable()
export class AuthService {
  public userProfile;

  public auth0 = new auth0.WebAuth({
    clientID: environment.auth0.clientID,
    domain:  environment.auth0.domain,
    responseType: environment.auth0.responseType,
    audience:  environment.auth0.audience,
    redirectUri:  environment.auth0.redirectUri,
    scope:  environment.auth0.scope,
  });

  constructor(private router: Router) {
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): Observable<any> {
    const sendResult = new Subject<any>();
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        const params = { IdentityPoolId: environment.aws_identity_pool_id };
        AWS.config.update({ region: environment.region });

        const cognitoidentity = new AWS.CognitoIdentity();
        const val = cognitoidentity.getId(params, (getIdError, getIdData) => {
          // This creates a Authenticated Identity with Cognito User Identity Pool
        const paramsIdentityId = {
          IdentityId: getIdData.IdentityId,
          Logins: {
            [environment.auth0.domain] : authResult.idToken
          }
        };
        cognitoidentity.getCredentialsForIdentity(paramsIdentityId, (getCredentialsForIdentityErr, getCredentialsForIdentityData) => {
            if (err) {
              console.error(err);
              sendResult.error(err);
            }
            AWS.config.update({
              accessKeyId: getCredentialsForIdentityData.Credentials.AccessKeyId,
              secretAccessKey: getCredentialsForIdentityData.Credentials.SecretKey,
              sessionToken: getCredentialsForIdentityData.Credentials.SessionToken
            });
            const localSotrageCred = {
              accessKeyId: getCredentialsForIdentityData.Credentials.AccessKeyId,
              secretAccessKey: getCredentialsForIdentityData.Credentials.SecretKey,
              region: environment.region,
              sessionToken: getCredentialsForIdentityData.Credentials.SessionToken
            };
            const creds = new AWS.Credentials(AWS.config.credentials);
            this.setCreds(localSotrageCred);
            sendResult.next(creds);
        });
        });
      } else if (err) {
        sendResult.error(err);
        this.router.navigate(['home']);
        console.log(err);
      }
    });

    return sendResult.asObservable();
  }

  public handleLimitedAuthentication(): Observable<any> {
    const sendResult = new Subject<any>();
    if (this.isAuthenticated()) {
      sendResult.error('User is authenticated.');
      return sendResult.asObservable();
    }
    console.log('Application starting... Setting limited authentication.');
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
    cognitoidentity.getId(paramsIdentityPool, (err, data) => {
      const paramsIdentityId = {
        IdentityId: data.IdentityId
      };
      cognitoidentity.getCredentialsForIdentity(paramsIdentityId, (getCredentialsForIdentityErr, getCredentialsForIdentityData) => {
          if (err) {
            console.error(err);
            sendResult.error(err);
          }
          AWS.config.update({
            accessKeyId: getCredentialsForIdentityData.Credentials.AccessKeyId,
            secretAccessKey: getCredentialsForIdentityData.Credentials.SecretKey,
            sessionToken: getCredentialsForIdentityData.Credentials.SessionToken
          });
          const localSotrageCred = {
            accessKeyId: getCredentialsForIdentityData.Credentials.AccessKeyId,
            secretAccessKey: getCredentialsForIdentityData.Credentials.SecretKey,
            region: environment.region,
            sessionToken: getCredentialsForIdentityData.Credentials.SessionToken
          };
          this.setCreds(localSotrageCred);
          const credsResult = new AWS.Credentials(AWS.config.credentials);
          sendResult.next(credsResult);
      });
    });
    return sendResult.asObservable();
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userEmail');

    localStorage.removeItem('accessKeyId');
    localStorage.removeItem('secretAccessKey');
    localStorage.removeItem('sessionToken');

    // Go back to the home route
    this.router.navigate(['home']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public gertUserProfile(): Observable<any> {
    const sendResult = new Subject<any>();
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      this.auth0.client.userInfo(accessToken, (userInfoError, profile) => {
        if (profile) {
          sendResult.next(profile);
        }
      });
    }
    return sendResult.asObservable();
  }

  public setCreds(creds: any) {
    localStorage.setItem('accessKeyId', creds.accessKeyId);
    localStorage.setItem('secretAccessKey', creds.secretAccessKey);
    localStorage.setItem('sessionToken', creds.sessionToken);
  }

}
