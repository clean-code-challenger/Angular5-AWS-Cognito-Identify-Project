import { ISubscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { AuthHelper } from '../shared/auth/auth.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AuthHelper implements OnInit {

  public year: number;

  constructor(private authService: AuthService) {
    super(authService);
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
