import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationMessagesService } from './validation-messages.service';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html'
})
export class ValidationMessagesComponent implements OnInit {
    @Input() control: FormControl;
    @Input() name: string;
    @Input() isFormSubmitted: boolean;
    constructor() { }

  ngOnInit() {
  }

  get errorMessage() {
      for (const propertyName in this.control.errors) {
        if ((this.control.errors.hasOwnProperty(propertyName) && !this.control.pristine)
        || (this.control.parent.pristine && this.isFormSubmitted)
        || (this.control.errors.hasOwnProperty(propertyName) && this.control.parent.dirty && this.isFormSubmitted)) {
          return ValidationMessagesService.getValidatorErrorMessage(propertyName, this.name, this.control.errors[propertyName]);
        }
      }
      return null;
    }
}
