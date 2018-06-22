import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { S3ObjectModel } from '../models/s3-object.model';
import { Subject } from 'rxjs/Subject';
import * as AWS from 'aws-sdk';
import { DynamodbS3ObjectModel } from '../models/dynamodb-s3-object.modal';
import { AuthService } from '../auth/auth.service';
import { DynamodbGreetingsObjectModel } from '../models/dynamodb-greetings-object.modal';

@Injectable()
export class DynamodbSandboxService {
  private docClient;

  constructor(private authService: AuthService) {
    AWS.config.update({
      accessKeyId: localStorage.getItem('accessKeyId'),
      secretAccessKey: localStorage.getItem('secretAccessKey'),
      sessionToken: localStorage.getItem('sessionToken')
    });
    const creds = new AWS.Credentials(AWS.config.credentials);
    const dynamodb = new AWS.DynamoDB({ region: environment.region, credentials: creds });
    this.docClient = new AWS.DynamoDB.DocumentClient({service: dynamodb});
  }

  public getItemsFromDynamoDb(tableName: string): Observable<Array<DynamodbS3ObjectModel>> {
    const sendResult = new Subject<Array<DynamodbS3ObjectModel>>();

    const params = {
      TableName: tableName,
      ExpressionAttributeValues: {
        ':m': localStorage.getItem('userEmail')
       },
       FilterExpression: 'created_by IN (:m)',
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

  public updateItemFromDynamoDb(object: DynamodbS3ObjectModel, tableName: string): Observable<Array<DynamodbS3ObjectModel>> {
    const sendResult = new Subject<Array<DynamodbS3ObjectModel>>();
    const datetime = new Date().getTime().toString();
    const params = {
      ExpressionAttributeValues: {
       ':k': object.object_display_name,
       ':d': datetime,
       ':m': localStorage.getItem('userEmail')
      },
      Key: { object_id : object.etag },
      TableName: tableName,
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

  public getGreetingItemsFromDynamoDb(tableName: string): Observable<Array<DynamodbGreetingsObjectModel>> {
    const sendResult = new Subject<Array<DynamodbGreetingsObjectModel>>();

    const params = {
      TableName: tableName
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

  public updateGreetingsItemFromDynamoDb
    (object: DynamodbGreetingsObjectModel, tableName: string): Observable<Array<DynamodbGreetingsObjectModel>> {
    const sendResult = new Subject<Array<DynamodbGreetingsObjectModel>>();
    const params = {
      ExpressionAttributeValues: {
       ':k': object.enabled,
       ':r': object.response_type,
      },
      Key: { greetings_config_id : object.greetings_config_id },
      TableName: tableName,
      UpdateExpression: 'SET enabled = :k, response_type = :r'
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

  public getGreetingResponsesItemsFromDynamoDb(tableName: string): Observable<Array<any>> {
    const sendResult = new Subject<Array<any>>();

    const params = {
      TableName: tableName
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
}
