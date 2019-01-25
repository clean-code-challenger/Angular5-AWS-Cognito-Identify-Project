import { CUHackitTweetObjectModel } from './../models/cuhackit-tweet-object.model';
import { ComprehendSandboxService } from './../comprehend-sandbox/comprehend-sandbox.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-cuhackit',
  templateUrl: './cuhackit.component.html',
  styleUrls: ['./cuhackit.component.css']
})
export class CUHackitComponent implements OnInit {
  public year: number;
  @ViewChild('textInput') textInput: ElementRef;
  public tweetsList: Array<CUHackitTweetObjectModel>;
  public tweetsListNext: Array<CUHackitTweetObjectModel>;

  constructor(private comprehendService: ComprehendSandboxService) {
    this.year = new Date().getFullYear();
    this.getTweets();
  }

  ngOnInit() {
    setInterval(() => {
      this.getTweets();
    }, 5000);
  }

  private submitText() {
    const textInput = this.textInput.nativeElement.value;
    this.comprehendService.simpleDetectSentiment(textInput);
  }

  private getTweets() {
    this.comprehendService.getAllNegativeTweets().subscribe((results) => {
      this.tweetsList = results;
      this.tweetsList.sort((a, b) => a.id - b.id);
      this.tweetsList = this.tweetsList.slice(-10);
      this.tweetsListNext = this.tweetsList.slice(-5);
      this.tweetsList = this.tweetsList.slice(0, 5);
      this.tweetsList.sort((a, b) => b.id - a.id);
      this.tweetsListNext.sort((a, b) => b.id - a.id);
    });
  }

  private formatDate(date: any) {
    const d = moment(date).format('MM/DD/YYYY hh:mm:ss A');
    return d;
  }

}
