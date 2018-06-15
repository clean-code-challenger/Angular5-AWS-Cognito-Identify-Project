import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { DynamodbGreetingsObjectModel } from '../shared/models/dynamodb-greetings-object.modal';
import { DynamodbSandboxService } from '../shared/dynamodb-sandbox/dynamodb-sandbox.service';
import { BsModalComponent } from 'ng2-bs3-modal';
import { UiSwitchModule } from 'ngx-toggle-switch';

@Component({
  selector: 'app-greetings-app',
  templateUrl: './greetings-app.component.html',
  styleUrls: ['./greetings-app.component.css']
})
export class GreetingsAppComponent implements OnInit {
  public aws;
  public year: number;
  public tableName: string;
  public objectList: Array<DynamodbGreetingsObjectModel>;
  public loadingObjs: boolean;
  public editObj: DynamodbGreetingsObjectModel;
  public changeObj: DynamodbGreetingsObjectModel;
  public responses: Array<any>;

  @ViewChild('myModal') modal: BsModalComponent;


  constructor(private dynamodbSandboxService: DynamodbSandboxService) {
    this.objectList = new Array<DynamodbGreetingsObjectModel>();
    this.responses = new Array<any>();
    this.loadingObjs = true;
    this.tableName = environment.greetings_app.dynamodb_table_name;
    this.year = new Date().getFullYear();
    this.editObj = new DynamodbGreetingsObjectModel();
    this.changeObj = new DynamodbGreetingsObjectModel();
  }

  ngOnInit() {
    this.loadObjects();
  }

  public loadObjects() {
    this.dynamodbSandboxService.getGreetingItemsFromDynamoDb(environment.greetings_app.dynamodb_table_name).subscribe(items => {
      this.objectList = items;
      this.loadingObjs = false;
    });
    this.dynamodbSandboxService.getGreetingResponsesItemsFromDynamoDb
    (environment.greetings_app.greetings_config_response_types_table).subscribe(items => {
      this.responses = items;
    });
  }

  public openEditModal(o: DynamodbGreetingsObjectModel) {
    this.editObj = o;
    this.modal.open();
  }

  public closeEditModal() {
    this.modal.close();
  }

  public updateObject() {
    this.changeObj = this.editObj;
    this.modal.close();
  }

  public onEnabledChange($event, o: DynamodbGreetingsObjectModel) {
    o.enabled = !o.enabled;
    this.dynamodbSandboxService.updateGreetingsItemFromDynamoDb(o, this.tableName).subscribe();
  }

  public transformEnabled(enabled: boolean) {
    if (enabled) {
      return 'ENABLED';
    }
    return 'DISABLED';
  }

}
