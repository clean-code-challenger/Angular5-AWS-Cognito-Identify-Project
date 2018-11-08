import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as AWS from 'aws-sdk';

@Injectable()
export class FirehoseSandboxService {

  private firehose;

  constructor(private authService: AuthService) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    this.firehose = new AWS.Firehose({ region: environment.region, signatureVersion: 'v4', credentials: creds });
  }

  public putMouseMoveRecord(payload: any) {
    const params = {
      Record: { /* required */
        Data: JSON.stringify(payload) /* Strings will be Base-64 encoded on your behalf */ /* required */
      },
      DeliveryStreamName: environment.firehose.stream_name, /* required */
    };
    this.firehose.putRecord(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
    });
  }

}
