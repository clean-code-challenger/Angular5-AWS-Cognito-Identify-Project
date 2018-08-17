import { LambdaSandboxService } from './../lambda-sandbox/lambda-sandbox.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GradesObjectModel } from './../models/grades-object.model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  public functionName: string;
  public year: number;
  public readDate: string;
  public finalGrade: number;

  public inputSubmitMessage: string;
  @ViewChild('secretID') secretID: ElementRef;
  public hasSecretID: boolean;

  constructor(private dynamodbSandboxService: DynamodbSandboxService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private lambdaSandboxService: LambdaSandboxService) {
    this.gradesList = new Array<GradesObjectModel>();
    this.functionName = environment.grades.lambda.functionName;
    this.year = new Date().getFullYear();
    const d = new Date();
    d.setHours(d.getHours() - 5);
    this.readDate = d.toDateString();
  }

  ngOnInit() {
    const secretId = this.activeRoute.snapshot.params['id'];
    if (secretId) {
      this.lambdaSandboxService.triggerFunction(this.functionName, secretId).subscribe(items => {
        if (items && items.length !== 0) {
          this.hasSecretID = true;
          this.loadingGrades = true;
          this.loadAttendance(secretId);
        } else {
          this.router.navigate(['grades']);
        }
      });
    }
  }

  public loadAttendance(secretId: string) {
    this.lambdaSandboxService.triggerFunction(this.functionName, secretId).subscribe(items => {
      this.gradesList = this.shuffle(items);
      this.loadingGrades = false;
    });
  }

  public formatGrade(input: number) {
    if (input === -1) {
      return '';
    } else {
      return input  + '%';
    }
  }

  public submitSecretId() {
    const secretId = this.secretID.nativeElement.value;
    if (!secretId) {
      this.inputSubmitMessage = 'Please enter in Secret ID.';
      return;
    }

    this.lambdaSandboxService.triggerFunction(this.functionName, secretId).subscribe(items => {
      if (items.length === 0) {
        this.inputSubmitMessage = 'Secret ID does not exist.';
        return;
      } else {
        this.router.navigate(['grades/' + secretId]);
      }
    });
  }

  public calculateFinalGrade(a: GradesObjectModel) {
      const assignment_1_1 = a.assignment_1_1;
      const assignment_1_2 = a.assignment_1_2;
      const assignment_1_3 = a.assignment_1_3;
      const assignment_2_1 = a.assignment_2_1;
      const assignment_2_2 = a.assignment_2_2;
      const assignment_2_3 = a.assignment_2_3;
      const midterm = a.midterm;
      const assignment_final = a.assignment_final;
      const graduate_presentation = a.graduate_presentation;

      const allGrades = new Array<number>();
      allGrades.push(assignment_1_1);
      allGrades.push(assignment_1_2);
      allGrades.push(assignment_1_3);
      allGrades.push(assignment_2_1);
      allGrades.push(assignment_2_2);
      allGrades.push(assignment_2_3);
      allGrades.push(midterm);
      allGrades.push(assignment_final);
      allGrades.push(graduate_presentation);

      let totalGradedGrades = 0;
      let totalPoints = 0;
      allGrades.forEach(g => {
        if (g !== -1) {
          totalGradedGrades++;
          totalPoints += g;
        }
        this.finalGrade = Math.round(totalPoints / totalGradedGrades * 100) / 100;
        a.final_grade = this.finalGrade;
      });
      return this.finalGrade;
  }

  public checkCurrentStudent(a: GradesObjectModel) {
    const secretId = this.activeRoute.snapshot.params['id'];
    if (a.secret_id === secretId) {
      return true;
    }
    return false;
  }

  public shuffle(array: any) {
    let currentIndex = array.length;
    let temporaryValue = null;
    let randomIndex = null;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}


