import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private angularFireAuth: AngularFireAuth) {}

  // canActivate(): boolean {
  //   debugger;
  //   if (!this.auth.isLoggedIn()) {
  //     this.router.navigate(['home']);
  //     return false;
  //   }
  //   return true;
  // }

  public canActivate(): Observable<boolean> | boolean {
    return this.angularFireAuth.authState.map((auth) => {
        if (auth) {
            console.log('authenticated');
            return true;
        }
        console.log('not authenticated');
        this.router.navigateByUrl('login');
        return false;
    }).first();
}
}
