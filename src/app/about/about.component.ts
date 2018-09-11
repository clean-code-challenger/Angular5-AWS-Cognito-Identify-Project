import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '../shared/auth/auth.helper';
import { setupRouter } from '@angular/router/src/router_module';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends AuthHelper implements OnInit {
  public year: number;
  constructor(private authService: AuthService) {
    super(authService);
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
