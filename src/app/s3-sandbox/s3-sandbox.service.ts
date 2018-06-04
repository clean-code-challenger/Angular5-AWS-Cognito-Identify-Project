import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { S3ObjectModel } from './../shared/models/s3-object.model';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class S3SandboxService {
  private s3;
  private bucketName: string;

  constructor() {
    const config = new AWS.Config({
      accessKeyId: environment.aws_access_key_id,
      secretAccessKey: environment.aws_secret_access_key,
      region: environment.region,
    });
    const creds = new AWS.Credentials(config.credentials);
    this.s3 = new AWS.S3({ signatureVersion: 'v4', credentials: creds });
    this.bucketName = environment.public_bucket_name;
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

  public uploadObjectToS3(object: any): Observable<Array<S3ObjectModel>> {
    const sendResult = new Subject<Array<S3ObjectModel>>();

    const params = {
      ACL: 'authenticated-read',
      Body: object,
      Bucket: this.bucketName,
      Key: object.name
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

}
