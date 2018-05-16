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

  constructor() {
    const config = new AWS.Config({
      accessKeyId: environment.aws_access_key_id,
      secretAccessKey: environment.aws_secret_access_key,
      region: environment.region,
    });
    const creds = new AWS.Credentials(config.credentials);
    this.s3 = new AWS.S3({ signatureVersion: 'v4', credentials: creds });
  }

  public getItems(): Observable<any> {
    const sendResult = new Subject<any>();
    // Bucket names must be unique across all S3 users
    // const myBucket = 'brocktubre-s3-sandbox-bucket';
    const params = {
      Bucket: 'brocktubre-s3-sandbox-bucket',
      MaxKeys: 5
    };
    this.s3.listObjectsV2(params, function(err, data) {
      if (err) {
        sendResult.error(err);
      }else {
        sendResult.next(data);
      }
    });
    return sendResult.asObservable();
  }

}
