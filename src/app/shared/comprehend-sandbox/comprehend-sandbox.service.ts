import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { environment } from './../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ComprehendSandboxService {
  private comprehend;

  constructor(private authService: AuthService) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    this.comprehend = new AWS.Comprehend({ region: environment.region, signatureVersion: 'v4', credentials: creds });
  }

  public simpleDetectSentiment(payload: string) {
    const params = {
      LanguageCode: 'en',
      Text: payload, /* required */
    };
    this.comprehend.detectSentiment(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data);
      }
    });
  }
}
