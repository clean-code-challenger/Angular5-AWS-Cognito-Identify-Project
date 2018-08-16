import { GradesObjectModel } from './../models/grades-object.model';
import { Component, OnInit } from '@angular/core';
import { DynamodbSandboxService } from '../dynamodb-sandbox/dynamodb-sandbox.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  public gradesList: Array<GradesObjectModel>;
  public loadingGrades: boolean;
  public tableName: string;
  public year: number;
  public readDate: string;
  public finalGrade: string;

  constructor(private dynamodbSandboxService: DynamodbSandboxService) {
    this.gradesList = new Array<GradesObjectModel>();
    this.loadingGrades = true;
    this.tableName = environment.grades.dynamoDb.tableName;
    this.year = new Date().getFullYear();
    const d = new Date();
    d.setHours(d.getHours() - 5);
    this.readDate = d.toDateString();
  }

  ngOnInit() {
      this.loadAttendance();
  }

  public loadAttendance() {
    this.dynamodbSandboxService.getGradesFromDynamoDB(this.tableName).subscribe(items => {
      this.gradesList = items;
      this.loadingGrades = false;
    });
  }

  public formatGrade(input: number) {
    if (input === -1) {
      return '';
    } else {
      return input;
    }
  }

}


