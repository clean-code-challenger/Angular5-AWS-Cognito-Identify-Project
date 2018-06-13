import { routes } from './app.routes';
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
    authService.handleAuthentication().subscribe(creds => {
      if (creds) {
        this.authService.setCreds(creds);
        this.router.navigate(['dashboard']);
      }
    });
    // authService.gertUserProfile().subscribe(profile => {
    //   if (profile) {
    //    authService.userProfile = profile;
    //   }
    // });
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
