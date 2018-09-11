import { AuthService } from './shared/auth/auth.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private titleService: Title, private authService: AuthService, private router: Router) {
    authService.handleLimitedAuthentication().subscribe((creds) => {

    }, (error) => {
      console.log(error);
    });
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
