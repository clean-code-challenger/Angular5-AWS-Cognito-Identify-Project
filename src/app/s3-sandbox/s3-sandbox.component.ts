import { S3SandboxService } from './s3-sandbox.service';
import { S3ObjectModel } from './../shared/models/s3-object.model';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-s3-sandbox',
  templateUrl: './s3-sandbox.component.html',
  styleUrls: ['./s3-sandbox.component.css']
})
export class S3SandboxComponent implements OnInit {
  public aws;
  public s3;
  public objectList: S3ObjectModel[];

  constructor(private s3SandboxService: S3SandboxService) {
  }

  ngOnInit() {
    this.s3SandboxService.getItems().subscribe(data => {
      debugger;
      this.objectList = data.Contents;
    });
    // this.objectList =
  }

}
