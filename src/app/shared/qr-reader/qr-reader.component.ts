import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrReaderService } from './qr-reader.service';
import { QrCodeObject } from '../models/qr-code-object.model';


@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css']
})
export class QrReaderComponent implements OnInit {
  public year: number;
  @ViewChild('scanner') scanner: ZXingScannerComponent;
  public hasCameras = false;
  public hasPermission: boolean;
  public qrResultString: string;
  public availableDevices: MediaDeviceInfo[];
  public selectedDevice: MediaDeviceInfo;
  public qrCodeResult: QrCodeObject;
  public hasResults: boolean;

  constructor(private qrService: QrReaderService) {
    this.year = new Date().getFullYear();
    this.qrCodeResult = new QrCodeObject();
    this.hasResults = false;
  }

    ngOnInit(): void {

        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
            this.hasCameras = true;
            console.log('Devices: ', devices);
            this.availableDevices = devices;
        });

        this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
            console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
        });

        this.scanner.permissionResponse.subscribe((answer: boolean) => {
          this.hasPermission = answer;
        });

    }

    handleQrCodeResult(resultString: string) {
        this.qrResultString = resultString.slice(0, -1);
        console.log('Result: ', this.qrResultString);
        this.qrService.processQrCode(this.qrResultString).subscribe((result: QrCodeObject) => {
          this.qrCodeResult = result;
          this.hasResults = true;
          this.playAudio();
          setTimeout(() => {
            this.hasResults = false;
          }, 5000);
        });
    }

    onDeviceSelectChange(selectedValue: string) {
        console.log('Selection changed: ', selectedValue);
        this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    }

    public playAudio() {
        const audio = new Audio();
        audio.src = '../assets/sounds/mode.wav';
        audio.load();
        audio.play();
    }

}
