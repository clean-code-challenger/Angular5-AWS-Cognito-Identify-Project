import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { S3ObjectModel } from '../shared/models/s3-object.model';
import { Subject } from 'rxjs/Subject';
import * as AWS from 'aws-sdk';
import { DynamodbS3ObjectModel } from '../shared/models/dynamodb-s3-object.modal';
import { AuthService } from '../shared/auth/auth.service';

@Injectable()
export class DynamodbSandboxService {
  private tableName: string;
  private docClient;

  constructor(private authService: AuthService) {
    AWS.config.credentials = {
      accessKeyId: this.authService.accessKeyId,
      secretAccessKey: this.authService.secretAccessKey,
      sessionToken: this.authService.sessionToken
    };
    const creds = new AWS.Credentials(AWS.config.credentials);
    const dynamodb = new AWS.DynamoDB({ region: environment.region, credentials: creds });
    this.docClient = new AWS.DynamoDB.DocumentClient({service: dynamodb});
    this.tableName = environment.dynamodb_table_name;
  }

  public getItemsFromDynamoDb(tableName: string): Observable<Array<DynamodbS3ObjectModel>> {
    const sendResult = new Subject<Array<DynamodbS3ObjectModel>>();

    const params = {
      TableName: this.tableName
    };

    this.docClient.scan(params, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data.Items);
      }
    });
    return sendResult.asObservable();
  }

  public updateItemFromDynamoDb(object: DynamodbS3ObjectModel): Observable<Array<DynamodbS3ObjectModel>> {
    const sendResult = new Subject<Array<DynamodbS3ObjectModel>>();
    const datetime = new Date().getTime().toString();
    const params = {
      ExpressionAttributeValues: {
       ':k': object.object_display_name,
       ':d': datetime,
       ':m': 'TODO'
      },
      Key: { object_id : object.etag },
      TableName: this.tableName,
      UpdateExpression: 'SET object_display_name = :k, modified_by = :m, modified_on = :d'
     };
     this.docClient.update(params, function(err, data) {
       if (err) {
        sendResult.error(err);
       }else {
        sendResult.next(data);
       }
      });
    return sendResult.asObservable();
  }
}
