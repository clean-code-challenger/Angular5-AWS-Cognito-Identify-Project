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

  constructor(private comprehendService: ComprehendSandboxService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
  }

  private submitText() {
    const textInput = this.textInput.nativeElement.value;
    this.comprehendService.simpleDetectSentiment(textInput);
  }

}
