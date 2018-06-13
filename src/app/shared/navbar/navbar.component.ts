import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isHomeActive: boolean;
  public isPortfolioActive: boolean;
  public isAboutActive: boolean;
  public isLoginActive: boolean;
  public collapse: boolean;
  public isUserLoggedIn: boolean;
  public usersEmail: string;
  public isS3SandboxActive: boolean;

  constructor(private router: Router,
              private titleService: Title,
              private authService: AuthService) {
                this.collapse = false;
                this.isUserLoggedIn = false;
                this.authService.gertUserProfile().subscribe(profile => {
                  this.usersEmail = profile.name;
                  localStorage.setItem('userEmail', this.usersEmail);
                });
              }

  ngOnInit() {
    const url = this.router.url;
    switch (url) {
      case '/home':
      case '/':
          this.isHomeActive = true;
          this.titleService.setTitle('Home | Brock Tubre');
          break;
        case '/portfolio':
          this.isPortfolioActive = true;
          this.titleService.setTitle('Portfolio | Brock Tubre');
          break;
        case '/about':
          this.isAboutActive = true;
          this.titleService.setTitle('About | Brock Tubre');
          break;
        case '/login':
          this.isLoginActive = true;
          this.titleService.setTitle('Login | Brock Tubre');
          break;
        case '/s3-sandbox':
          this.isS3SandboxActive = true;
          this.titleService.setTitle('S3 Store | Brock Tubre');
        break;
        default:
          this.titleService.setTitle('Brock Tubre');
        break;
    }

    if (this.authService.isAuthenticated()) {
      this.isUserLoggedIn = true;
      this.usersEmail = localStorage.getItem('userEmail');
    }
  }

  public navigateAuth0Login() {
    this.authService.login();
  }

  public logoutUser() {
    this.authService.logout();
  }

}
