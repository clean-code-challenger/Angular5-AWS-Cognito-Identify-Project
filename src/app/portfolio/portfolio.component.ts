import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { AuthHelper } from '../shared/auth/auth.helper';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent extends AuthHelper implements OnInit {
  public year: number;
  constructor(private router: Router, private authService: AuthService) {
    super(authService);
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

  public goToS3Store() {
    this.router.navigate(['s3-sandbox']);
  }

  public goToQrReader() {
    this.router.navigate(['qr-reader']);
  }

  goToAttendance() {
    this.router.navigate(['qr-reader/attendance']);
  }

}
