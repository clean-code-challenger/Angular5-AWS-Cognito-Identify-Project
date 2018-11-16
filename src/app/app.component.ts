import { FirehoseSandboxService } from './shared/firehose-sandbox/firehose-sandbox.service';
import { AuthService } from './shared/auth/auth.service';
import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private titleService: Title,
              private authService: AuthService,
              private router: Router,
              private firehose: FirehoseSandboxService) {
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  // @HostListener('mousemove', ['$event'])
  // onMousemove(event: MouseEvent) {
  //   const payload = {
  //     type: event.type,
  //     x: event.x,
  //     y: event.y,
  //     url: this.router.url
  //   };
  //   this.firehose.putMouseMoveRecord(payload);
  // }

  // @HostListener('document:click', ['$event'])
  // public documentClick(event: Event) {
  //   if (event.currentTarget['activeElement'].indexOf('a') > -1) {
  //     debugger;
  //     return;
  //   }

  //   const buttonClicked = event.currentTarget['activeElement'].innerText;
  //   const payload = {
  //       type: event.type,
  //       buttonClicked: buttonClicked,
  //       url: this.router.url
  //   };
  //   debugger;
  //   this.firehose.putMouseMoveRecord(payload);
  // }
}
