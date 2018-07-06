import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../../../../node_modules/rxjs/Subject';
import { environment } from '../../../environments/environment';
import { QrCodeObject } from '../models/qr-code-object.model';

@Injectable()
export class QrReaderService {

  public qrCodeResult: string;
  constructor(private http: HttpClient) { }

  public processQrCode(qrCode: string): Observable<QrCodeObject> {
    const sendResult = new Subject<QrCodeObject>();

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json;');
    const httpOptions = {
      headers: headers
    };
    let processUrl = environment.qrReader.apiGateway.processQrCodeUrl;
    processUrl += qrCode;
    const processQrCode = this.http.post(processUrl, httpOptions);
    processQrCode.subscribe((result: any) => {
        sendResult.next(result);
    });

    return sendResult.asObservable();
  }
}
