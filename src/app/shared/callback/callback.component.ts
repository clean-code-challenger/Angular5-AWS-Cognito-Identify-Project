import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  public year: number;

  constructor() {
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
