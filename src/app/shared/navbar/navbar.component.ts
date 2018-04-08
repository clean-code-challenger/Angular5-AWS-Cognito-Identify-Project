import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isHomeActive: boolean;
  public isPortfolioActive: boolean;
  public isAboutActive: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    const url = this.router.url;
    switch (url) {
      case '/home':
        this.isHomeActive = true;
        break;
        case '/portfolio':
        this.isPortfolioActive = true;
        break;
        case '/about':
        this.isAboutActive = true;
        break;
    }
  }

}
