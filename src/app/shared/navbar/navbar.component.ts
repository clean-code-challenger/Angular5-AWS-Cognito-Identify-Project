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

  constructor(private router: Router,
              private titleService: Title,
              private authService: AuthService) {
                this.collapse = false;
                this.isUserLoggedIn = false;
              }

  ngOnInit() {
    const url = this.router.url;
    switch (url) {
      case '/home':
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
        default:
          this.titleService.setTitle('Brock Tubre');
        break;
    }

    if (this.authService.isLoggedIn()) {
      this.isUserLoggedIn = true;
      this.usersEmail = this.authService.getUsersDeatils().email;
    }
  }

  public logoutUser() {
    this.authService.logout();
  }

}
