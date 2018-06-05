import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { S3ObjectModel } from '../shared/models/s3-object.model';
import { Subject } from 'rxjs/Subject';
import * as AWS from 'aws-sdk';
import { DynamodbS3ObjectModel } from '../shared/models/dynamodb-s3-object.modal';

@Injectable()
export class DynamodbSandboxService {
  private tableName: string;
  private docClient;

  constructor() {
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

  public updateItemFromDynamoDb(objectName: DynamodbS3ObjectModel): Observable<Array<DynamodbS3ObjectModel>> {
    const sendResult = new Subject<Array<DynamodbS3ObjectModel>>();
    sendResult.next(null);
    return sendResult.asObservable();
  }

}
