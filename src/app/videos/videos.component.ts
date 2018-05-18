import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  public videoSrc: string;
  public year: string;
  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear().toString();
    this.videoSrc = 'https://s3.us-east-2.amazonaws.com/brocktubre-public-bucket/acloudguru_video.mov';
  }

}
