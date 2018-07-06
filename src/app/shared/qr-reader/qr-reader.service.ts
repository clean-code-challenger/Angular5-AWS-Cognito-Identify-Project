import { Injectable } from '@angular/core';

@Injectable()
export class QrReaderService {
  private s3;
  http: any;

  constructor() { }

  public processQrCode(qrCode: string) {

    let processUrl = 'https://dr1yb4vbs0.execute-api.us-east-1.amazonaws.com/integration/process-code/';
    processUrl += qrCode;

    const processQrCode = this.http.post(processUrl).promise();

    return processQrCode;
  }

}
