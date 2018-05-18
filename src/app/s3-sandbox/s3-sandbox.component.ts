import { S3SandboxService } from './s3-sandbox.service';
import { S3ObjectModel } from './../shared/models/s3-object.model';
import { environment } from './../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  public objectList: Array<S3ObjectModel>;
  public loadingObjs: boolean;

  @ViewChild('fileInput') myFileInput: ElementRef;
  @ViewChild('fileInputVal') myFileInputVal: ElementRef;

  constructor(private s3SandboxService: S3SandboxService) {
    this.objectList = new Array<S3ObjectModel>();
    this.loadingObjs = false;
  }

  ngOnInit() {
    // this.s3SandboxService.getItemsFromBucket('brocktubre-s3-sandbox-bucket').subscribe(items => {
    //   this.objectList = items;
    //   this.loadingObjs = false;
    // });
  }

  public fileChanged($event){
    console.log('File change detected. ', this.myFileInput.nativeElement.files[0]);
    this.myFileInputVal.nativeElement.value = this.myFileInput.nativeElement.files[0].name;

  }

}
