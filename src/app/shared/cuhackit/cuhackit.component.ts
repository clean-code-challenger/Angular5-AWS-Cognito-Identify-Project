import { CUHackitTweetObjectModel } from './../models/cuhackit-tweet-object.model';
import { ComprehendSandboxService } from './../comprehend-sandbox/comprehend-sandbox.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cuhackit',
  templateUrl: './cuhackit.component.html',
  styleUrls: ['./cuhackit.component.css']
})
export class CUHackitComponent implements OnInit {
  public year: number;
  @ViewChild('textInput') textInput: ElementRef;
  public tweetsList: Array<CUHackitTweetObjectModel>;

  constructor(private comprehendService: ComprehendSandboxService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.comprehendService.getAllNegativeTweets().subscribe((result: CUHackitTweetObjectModel) => {
      // this.tweetsList = results;
      console.log(result);
    });
  }

  private submitText() {
    const textInput = this.textInput.nativeElement.value;
    this.comprehendService.simpleDetectSentiment(textInput);
  }

}
