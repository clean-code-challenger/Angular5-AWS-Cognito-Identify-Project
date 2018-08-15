import { S3SandboxService } from './../../s3-sandbox/s3-sandbox.service';
import { DynamodbSandboxService } from './../../dynamodb-sandbox/dynamodb-sandbox.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { QrCodeObject } from '../../models/qr-code-object.model';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  public attendanceList: Array<QrCodeObject>;
  public loadingAttendance: boolean;
  public tableName: string;
  public year: number;
  public readDate: string;
  private IMG_CAPTURE_BUCKET = 'qr-code-capture';

  constructor(private dynamodbSandboxService: DynamodbSandboxService,
              private s3SandboxService: S3SandboxService) {
    this.attendanceList = new Array<QrCodeObject>();
    this.loadingAttendance = true;
    this.tableName = environment.qrReader.dynamoDb.tableName;
    this.year = new Date().getFullYear();
    const d = new Date();
    d.setHours(d.getHours() - 5);
    this.readDate = d.toDateString();
    setInterval(() => {
      this.loadAttendance();
    }, 10000);
  }

  ngOnInit() {
    this.loadAttendance();
  }

  public loadAttendance() {
    this.dynamodbSandboxService.getAttendanceFromDynamoDb(this.tableName).subscribe(items => {
      this.attendanceList = items;
      this.loadingAttendance = false;
    });
  }

  public getImageSnap(a: any) {
    this.s3SandboxService.getObjectFromS3(this.IMG_CAPTURE_BUCKET, a.object_name).subscribe(item => {
      const blob = new Blob([item.Body], { type: item.ContentType });
      FileSaver.saveAs(blob, a.object_name);
    });
  }

}
