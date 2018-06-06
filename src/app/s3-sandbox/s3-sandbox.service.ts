import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { S3ObjectModel } from './../shared/models/s3-object.model';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../shared/auth/auth.service';

@Injectable()
export class S3SandboxService {
  private s3;

  constructor(private authService: AuthService) {
    const config = new AWS.Config({
      accessKeyId: environment.aws_access_key_id,
      secretAccessKey: environment.aws_secret_access_key,
      region: environment.region,
    });
    const creds = new AWS.Credentials(config.credentials);
    this.s3 = new AWS.S3({ signatureVersion: 'v4', credentials: creds });
  }

  public getItemsFromBucket(bucketName: string): Observable<Array<S3ObjectModel>> {
    const sendResult = new Subject<Array<S3ObjectModel>>();

    const params = {
      Bucket: bucketName,
      MaxKeys: 5,

    };
    this.s3.listObjectsV2(params, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data.Contents);
      }
    });
    return sendResult.asObservable();
  }

  public uploadObjectToS3(bucketName: string, object: any): Observable<Array<S3ObjectModel>> {
    const sendResult = new Subject<Array<S3ObjectModel>>();
    const UUID = uuid();
    // const metadata = new Map();
    // metadata.set('object_original_name', object.name);
    // metadata.set('created_by', this.authService.getUsersDeatils().email);
    // metadata.set('modified_by', this.authService.getUsersDeatils().email);

    const params = {
      ACL: 'authenticated-read',
      Body: object,
      Bucket: bucketName,
      Key: UUID,
      Metadata: {
        'object_original_name' : object.name,
        'created_by': this.authService.getUsersDeatils().email
      }
    };

    this.s3.putObject(params, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data.Contents);
      }
    });
    return sendResult.asObservable();
  }

  public getObjectFromS3(bucketName: string, key: string): Observable<any> {
    const sendResult = new Subject<any>();
    const params = {
      Bucket: bucketName,
      Key: key
    };

    this.s3.getObject(params,
      function (error, data) {
        if (error) {
          sendResult.error(error);
        } else {
          sendResult.next(data);
          // do something with data.Body
        }
      });
    return sendResult.asObservable();
  }

  public deleteObjectFromS3(bucketName: string, key: string): Observable<any> {
    const sendResult = new Subject<any>();
    const params = {
      Bucket: bucketName,
      Key: key
    };

    this.s3.deleteObject(params,
      function (error, data) {
        if (error) {
          sendResult.error(error);
        } else {
          sendResult.next(data);
          // do something with data.Body
        }
      });
    return sendResult.asObservable();
  }

}
