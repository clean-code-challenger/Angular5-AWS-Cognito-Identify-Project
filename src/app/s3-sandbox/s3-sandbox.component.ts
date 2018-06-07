import { DynamodbSandboxService } from './../dynamodb-sandbox/dynamodb-sandbox.service';
import { S3SandboxService } from './s3-sandbox.service';
import { S3ObjectModel } from './../shared/models/s3-object.model';
import { environment } from './../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs/Observable';
import * as FileSaver from 'file-saver';
import { BsModalComponent } from 'ng2-bs3-modal';
import { DynamodbS3ObjectModel } from '../shared/models/dynamodb-s3-object.modal';

@Component({
  selector: 'app-s3-sandbox',
  templateUrl: './s3-sandbox.component.html',
  styleUrls: ['./s3-sandbox.component.css']
})
export class S3SandboxComponent implements OnInit {
  public aws;
  public s3;
  public objectList: Array<DynamodbS3ObjectModel>;
  public loadingObjs: boolean;
  public bucketName: string;
  public tableName: string;
  public fileToUpload: any;
  public uploadedObject: DynamodbS3ObjectModel;
  public currentFileExt: string;
  public inputFieldVal: string;
  public inputFieldValidationMessage: string;
  public year: number;

  @ViewChild('fileInput') myFileInput: ElementRef;
  @ViewChild('fileInputVal') myFileInputVal: ElementRef;
  @ViewChild('myModal') modal: BsModalComponent;

  constructor(private s3SandboxService: S3SandboxService,
              private dynamodbSandboxService: DynamodbSandboxService) {
    this.objectList = new Array<DynamodbS3ObjectModel>();
    this.loadingObjs = true;
    this.bucketName = environment.public_bucket_name;
    this.tableName = environment.dynamodb_table_name;
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.loadObjects();
  }

  public fileChanged($event) {
    const file = this.myFileInput.nativeElement.files[0];

    if (file === undefined) {
      console.log('Cancel selected. Do nothing. ', file);

    } else {
      console.log('File change detected. ', file);
      this.myFileInputVal.nativeElement.value = file.name;
      this.fileToUpload = file;
    }

  }

  public uploadObject() {
    const file = this.myFileInputVal.nativeElement.files;

    if (file === undefined || this.myFileInputVal.nativeElement.value.length === 0) {
      console.log('No file selected.');
    }else {
      this.loadingObjs = true;
      console.log('We want to upload this document: ', this.fileToUpload);
      this.s3SandboxService.uploadObjectToS3(this.bucketName, this.fileToUpload).subscribe(item => {
        this.myFileInputVal.nativeElement.value = null;
        this.fileToUpload = null;
        setTimeout(this.loadObjects.bind(this), 2000);
      });
    }
  }

  public loadObjects() {
    // this.s3SandboxService.getItemsFromBucket(this.bucketName).subscribe(items => {
    //   this.objectList = items;
    //   this.loadingObjs = false;
    // });
    this.dynamodbSandboxService.getItemsFromDynamoDb(this.tableName).subscribe(items => {
      this.objectList = items;
      this.loadingObjs = false;
    });
  }

  public downloadObject(object: any) {
    this.s3SandboxService.getObjectFromS3(this.bucketName, object.object_name).subscribe(item => {
      const blob = new Blob([item.Body], { type: item.ContentType });
      FileSaver.saveAs(blob, object.object_display_name);
    });
  }

  public deleteObject(object: any) {
    this.loadingObjs = true;
    this.s3SandboxService.deleteObjectFromS3(this.bucketName, object.object_name).subscribe(item => {
        this.fileToUpload = null;
        setTimeout(this.loadObjects.bind(this), 2000);
    });
  }

  private cleanObjectName(fileName: string) {
    let returnName = fileName;
    returnName = returnName.split('+').join(' ');
    return returnName;
  }

  private openEditModal(object: DynamodbS3ObjectModel) {
    this.inputFieldValidationMessage = null;
    this.uploadedObject = object;
    this.currentFileExt = object.object_display_name.split('.').pop();
    this.inputFieldVal = object.object_display_name.replace(/\.[^/.]+$/, '');
    this.modal.open();
  }

  public closeEditModal() {
    this.inputFieldValidationMessage = null;
    this.modal.close();
  }

  public updateObject() {
    if (this.isFormValid()) {
      const updateObj = new DynamodbS3ObjectModel;
      updateObj.object_display_name = this.inputFieldVal + '.' + this.currentFileExt;
      updateObj.etag = this.uploadedObject.etag;
      console.log('Need to update this object: ', updateObj);
      this.loadingObjs = true;
      this.closeEditModal();
      this.dynamodbSandboxService.updateItemFromDynamoDb(updateObj).subscribe((data) => {
        setTimeout(this.loadObjects.bind(this), 2000);
        this.closeEditModal();
      });
    }
  }

  public updateInputVal($event) {
    this.inputFieldVal = $event.target.value;
  }

  private isFormValid() {
    this.inputFieldValidationMessage = null;
    if (!this.inputFieldVal) {
      this.inputFieldValidationMessage = 'Name is required.';
      return false;
    }
    return true;
  }

}
