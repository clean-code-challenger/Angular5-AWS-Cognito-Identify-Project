import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}


  public canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.login();
      return false;
    }
    return true;
  }
}
