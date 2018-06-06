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
    const config = new AWS.Config({
      accessKeyId: environment.aws_access_key_id,
      secretAccessKey: environment.aws_secret_access_key,
      region: environment.region,
    });
    const creds = new AWS.Credentials(config.credentials);
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
    debugger;
    const params = {
      ExpressionAttributeValues: {
       ':k': object.object_display_name,
       ':d': datetime,
       ':m': this.authService.getUsersDeatils().email
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
