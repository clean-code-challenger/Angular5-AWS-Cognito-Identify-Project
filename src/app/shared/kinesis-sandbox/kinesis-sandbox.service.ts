import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as AWS from 'aws-sdk';

@Injectable()
export class KinesisSandboxService {
  private kinesis;

  constructor(private authService: AuthService) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    this.kinesis = new AWS.Kinesis({ region: environment.region, signatureVersion: 'v4', credentials: creds });
  }

}
