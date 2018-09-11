import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscribable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit, OnDestroy {
  public year: number;
  private subscription: ISubscription;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = authService.handleAuthentication().subscribe(creds => {
      if (creds) {
        console.log('Setting user to Auth access.');
        this.router.navigate(['home']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
