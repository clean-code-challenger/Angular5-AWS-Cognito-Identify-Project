import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuhackit',
  templateUrl: './cuhackit.component.html',
  styleUrls: ['./cuhackit.component.css']
})
export class CUHackitComponent implements OnInit {
  public year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
