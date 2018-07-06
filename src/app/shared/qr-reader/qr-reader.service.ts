import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../../../../node_modules/rxjs/Subject';

@Injectable()
export class QrReaderService {
  private s3;
  constructor(private http: HttpClient) { }

  public processQrCode(qrCode: string): Observable<string> {
    const sendResult = new Subject<string>();

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json;');
    const httpOptions = {
      headers: headers
    };
    let processUrl = 'https://dr1yb4vbs0.execute-api.us-east-1.amazonaws.com/integration/process-code/';
    processUrl += qrCode;
    const processQrCode = this.http.post(processUrl, httpOptions);

    processQrCode.subscribe((result) => {
      debugger;
      sendResult.next(result.toString());
    });

    return sendResult.asObservable();
  }

}
