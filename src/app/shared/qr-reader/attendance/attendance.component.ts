import { DynamodbSandboxService } from './../../dynamodb-sandbox/dynamodb-sandbox.service';
import { QrReaderService } from './../qr-reader.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { QrCodeObject } from '../../models/qr-code-object.model';

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

  constructor(private dynamodbSandboxService: DynamodbSandboxService) {
    this.attendanceList = new Array<QrCodeObject>();
    this.loadingAttendance = true;
    this.tableName = environment.qrReader.dynamoDb.tableName;
    this.year = new Date().getFullYear();
    const d = new Date();
    d.setHours(d.getHours() - 5);
    this.readDate = d.toDateString();
  }

  ngOnInit() {
    setInterval(() => {
      this.loadAttendance();
    }, 10000);
  }

  public loadAttendance() {
    this.dynamodbSandboxService.getAttendanceFromDynamoDb(this.tableName).subscribe(items => {
      this.attendanceList = items;
      this.loadingAttendance = false;
    });
  }

}
