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

  @ViewChild('myModal') modal: BsModalComponent;


  constructor(private dynamodbSandboxService: DynamodbSandboxService) {
    this.objectList = new Array<DynamodbGreetingsObjectModel>();
    this.loadingObjs = true;
    this.tableName = environment.greetings_app.dynamodb_table_name;
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.loadObjects();
  }

  public loadObjects() {
    this.dynamodbSandboxService.getGreetingItemsFromDynamoDb(this.tableName).subscribe(items => {
      this.objectList = items;
      this.loadingObjs = false;
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
    this.modal.close();
  }

  public onEnabledChange($event, o: DynamodbGreetingsObjectModel) {
    o.enabled = !o.enabled;
    this.dynamodbSandboxService.updateGreetingsItemFromDynamoDb(o, this.tableName).subscribe(items => {

    });
  }

}
