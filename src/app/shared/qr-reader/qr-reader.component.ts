import { environment } from './../../../environments/environment';
import { S3SandboxService } from './../s3-sandbox/s3-sandbox.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrReaderService } from './qr-reader.service';
import { QrCodeObject } from '../models/qr-code-object.model';
import * as moment from 'moment';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css']
})
export class QrReaderComponent implements OnInit, AfterViewInit {

  public year: number;
  @ViewChild('studentID') studentID: ElementRef;
  public hasCameras = false;
  public hasPermission: boolean;
  public qrResultString: string;
  public qrCodeResult: QrCodeObject;
  public hasResults: boolean;
  public inputSubmitMessage: string;
  public navigator: Navigator;
  public scannerFound: boolean;

  constructor(private qrService: QrReaderService, private s3SandboxService: S3SandboxService) {
    this.year = new Date().getFullYear();
    this.qrCodeResult = new QrCodeObject();
    this.hasResults = false;
    this.inputSubmitMessage = null;
    this.scannerFound = false;
  }

    ngOnInit(): void {
      //   this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      //       this.hasCameras = true;
      //       // console.log('Devices: ', devices);
      //       this.availableDevices = devices;
      //   });
      //   this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      //       console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
      //   });
      //   this.scanner.permissionResponse.subscribe((answer: boolean) => {
      //     this.hasPermission = answer;
      //   });

    }

    public getUSBDevices() {
      this.scannerFound = true;
      let newVariable: any;
        newVariable = window.navigator;
        newVariable.usb.requestDevice({filters: []}).then(function(device){
          const openPromise = device.open();
          openPromise.then(function(){
              const transferPromise = device.transferIn(1, 6);
              transferPromise.then(function(data) {
                this.handleQrCodeResult(data);
                debugger;
              });
          });
       });
    }

    public ngAfterViewInit() {
    }

    public capture() {
      // const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
      // const capture = this.canvas.nativeElement.toDataURL('image/png');
      // return capture;
    }

    handleQrCodeResult(resultString: string) {
        // const imgCapture = this.capture();
        this.inputSubmitMessage = null;
        this.qrResultString = resultString.slice(0, -1);
        console.log('Result: ', this.qrResultString);
        this.qrService.processQrCode(this.qrResultString).subscribe((result: QrCodeObject) => {
          this.qrCodeResult = result;
          this.hasResults = true;
          this.playAudio(this.qrCodeResult.enabled);
          // this.s3SandboxService.uploadCaptureImage(environment.qrReader.s3.qrCodeCaptureBucket, imgCapture, this.qrCodeResult)
          // .subscribe();
          setTimeout(() => {
            this.hasResults = false;
          }, 5000);
        });
    }

    // onDeviceSelectChange(selectedValue: string) {
    //     console.log('Selection changed: ', selectedValue);
    //     this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    // }

    public playAudio(enabled: boolean) {
        const audio = new Audio();
        if (enabled) {
          audio.src = '../assets/sounds/mode.wav';
        } else {
          audio.src = '../assets/sounds/computer_error.wav';
        }
        audio.load();
        audio.play();
    }

    public submitStudentId() {
      // const imgCapture = this.capture();
      this.inputSubmitMessage = null;
      const upperCase = this.studentID.nativeElement.value.toUpperCase().trim();
      if (!upperCase) {
        this.inputSubmitMessage = 'Please enter a StudentID.';
      } else {
        const d = new Date();
        d.setHours(d.getHours() - 5);
        const todaysDateId = moment(d.toISOString()).format('MM-DD-YYYY');
        const submitKey = todaysDateId + '_' + upperCase + '.png';
        this.qrService.processQrCode(submitKey).subscribe((result: QrCodeObject) => {
          if (!result) {
            this.inputSubmitMessage = 'This is an invalid StudentID.';
          } else {
            this.inputSubmitMessage = null;
            this.studentID.nativeElement.value = null;
            this.qrCodeResult = result;
            this.hasResults = true;
            this.playAudio(this.qrCodeResult.enabled);
            // this.s3SandboxService.uploadCaptureImage( environment.qrReader.s3.qrCodeCaptureBucket,
            //                                           imgCapture,
            //                                           this.qrCodeResult).subscribe();
            setTimeout(() => {
              this.hasResults = false;
            }, 5000);
          }
        });
      }

    }

}
