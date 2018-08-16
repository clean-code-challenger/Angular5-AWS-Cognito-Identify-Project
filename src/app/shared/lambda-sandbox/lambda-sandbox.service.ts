import { GradesObjectModel } from './../models/grades-object.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { S3ObjectModel } from '../models/s3-object.model';
import { Subject } from 'rxjs/Subject';
import * as AWS from 'aws-sdk';
import { DynamodbS3ObjectModel } from '../models/dynamodb-s3-object.modal';
import { AuthService } from '../auth/auth.service';
import { QrCodeObject } from '../models/qr-code-object.model';
import { Moment } from 'moment';

@Injectable()
export class LambdaSandboxService {
  private functionName: string;
  private lambda;

  constructor(private authService: AuthService) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    const lambda = new AWS.Lambda({ region: environment.region, credentials: creds });
    this.functionName = environment.dynamodb_table_name;
  }

  public triggerFunction(functionName: string, secretId: string): Observable<Array<GradesObjectModel>> {
    const sendResult = new Subject<Array<GradesObjectModel>>();
    const invokeParams = {
      FunctionName : functionName,
      InvocationType : 'RequestResponse',
      LogType : 'None',
      Payload: '{ "secret_id":"' + secretId + '"}'
    };

    this.lambda.invoke(invokeParams, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data.Items);
      }
    });
    return sendResult.asObservable();
  }
}
