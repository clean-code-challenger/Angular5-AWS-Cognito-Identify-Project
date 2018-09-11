import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  public year: number;

  constructor(private authService: AuthService, private router: Router) {
    authService.handleAuthentication().subscribe(creds => {
      if (creds) {
        console.log('Setting user to Auth access.');
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
