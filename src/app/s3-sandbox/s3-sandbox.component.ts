import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-s3-sandbox',
  templateUrl: './s3-sandbox.component.html',
  styleUrls: ['./s3-sandbox.component.css']
})
export class S3SandboxComponent implements OnInit {
  public aws;
  public s3;

  constructor() {
    const config = new AWS.Config({
      accessKeyId: environment.aws_access_key_id,
      secretAccessKey: environment.aws_secret_access_key,
      region: environment.region,
    });
    const creds = new AWS.Credentials(config.credentials);
    this.s3 = new AWS.S3({ signatureVersion: 'v4', credentials: creds });
  }

  ngOnInit() {
    // Bucket names must be unique across all S3 users
    // const myBucket = 'brocktubre-s3-sandbox-bucket';
    const params = {
      Bucket: 'brocktubre-s3-sandbox-bucket',
      MaxKeys: 5
    };
    this.s3.listObjectsV2(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }else {
        console.log(data);           // successful response
      }
    });
  }

}
