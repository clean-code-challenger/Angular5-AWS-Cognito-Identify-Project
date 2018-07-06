import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrReaderService } from './qr-reader.service';


@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css']
})
export class QrReaderComponent implements OnInit {
  public year: number;
  constructor(private qrService: QrReaderService) {
    this.year = new Date().getFullYear();
  }

    @ViewChild('scanner')
    scanner: ZXingScannerComponent;

    hasCameras = false;
    hasPermission: boolean;
    qrResultString: string;

    availableDevices: MediaDeviceInfo[];
    selectedDevice: MediaDeviceInfo;

    ngOnInit(): void {

        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
            this.hasCameras = true;

            console.log('Devices: ', devices);
            this.availableDevices = devices;

            // selects the devices's back camera by default
            // for (const device of devices) {
            //     if (/back|rear|environment/gi.test(device.label)) {
            //         this.scanner.changeDevice(device);
            //         this.selectedDevice = device;
            //         break;
            //     }
            // }
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
        this.qrService.processQrCode(this.qrResultString).subscribe((result) => {
          debugger;
          console.log(result);
        });
    }

    onDeviceSelectChange(selectedValue: string) {
        console.log('Selection changed: ', selectedValue);
        this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    }

}
