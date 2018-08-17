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

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Secret ID', name: 'secret_id', sort: false},
    {title: 'A 1.1', name: 'assignment_1_1', sort: ''},
    {title: 'A 1.2', name: 'assignment_1_2', sort: ''},
    {title: 'A 1.3', name: 'assignment_1_3', sort: ''},
    {title: 'A 2.1', name: 'assignment_2_1', sort: ''},
    {title: 'A 2.2', name: 'assignment_2_2', sort: ''},
    {title: 'A 2.3', name: 'assignment_2_3', sort: ''},
    {title: 'Midterm', name: 'midterm'},
    {title: 'Graduate Presentations', name: 'graduate_presentation', sort: ''},
    {title: 'Final', name: 'assignment_final'},
    {title: 'Average', name: 'final_grade', sort: 'desc'}
  ];
  public page: Number = 1;
  public itemsPerPage: Number = 20;
  public maxSize: Number = 5;
  public numPages: Number = 1;
  public length: Number = 0;

  public config: any = {
    paging: false,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data: Array<GradesObjectModel>;

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

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = sortedData;
    this.length = sortedData.length;

  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.calculateFinalGrade(item);
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public loadAttendance(secretId: string) {
    this.lambdaSandboxService.triggerFunction(this.functionName, secretId).subscribe(items => {
      this.length = items.length;
      this.data = items;
      this.gradesList = this.data;
      this.onChangeTable(this.config);
      this.loadingGrades = false;
    });
  }

  public formatGrades(a: any) {
    a.assignment_1_1 = a.assignment_1_1 === -1 ? '' : a.assignment_1_1;
    a.assignment_1_2 = a.assignment_1_2 === -1 ? '' : a.assignment_1_2;
    a.assignment_1_3 = a.assignment_1_3 === -1 ? '' : a.assignment_1_3;
    a.assignment_2_1 = a.assignment_2_1 === -1 ? '' : a.assignment_2_1;
    a.assignment_2_2 = a.assignment_2_2 === -1 ? '' : a.assignment_2_2;
    a.assignment_2_3 = a.assignment_2_3 === -1 ? '' : a.assignment_2_3;
    a.midterm = a.midterm === -1 ? '' : a.midterm;
    a.assignment_final = a.assignment_final === -1 ? '' : a.assignment_final;
    a.graduate_presentation = a.graduate_presentation === -1 ? '' : a.graduate_presentation;
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

  public calculateFinalGrade(a: any) {
      if (a.final_grade !== undefined) {
        return;
      }

      const assignment_1_1 = a.assignment_1_1;
      const assignment_1_2 = a.assignment_1_2;
      const assignment_1_3 = a.assignment_1_3;
      const assignment_2_1 = a.assignment_2_1;
      const assignment_2_2 = a.assignment_2_2;
      const assignment_2_3 = a.assignment_2_3;
      const midterm = a.midterm;
      const assignment_final = a.assignment_final;
      const graduate_presentation = a.graduate_presentation;

      const allGrades = new Array<any>();
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
      this.formatGrades(a);
  }

  public checkCurrentStudent(a: GradesObjectModel) {
    const secretId = this.activeRoute.snapshot.params['id'];
    if (a.secret_id === secretId) {
      return true;
    }
    return false;
  }

  // public shuffle(array: any) {
  //   let currentIndex = array.length;
  //   let temporaryValue = null;
  //   let randomIndex = null;

  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {

  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // }

  public onCellClick(data: any): any {
    console.log(data);
  }

}


