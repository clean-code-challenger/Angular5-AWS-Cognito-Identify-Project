import { TestBed, inject } from '@angular/core/testing';

import { QrReaderService } from './qr-reader.service';

describe('QrReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QrReaderService]
    });
  });

  it('should be created', inject([QrReaderService], (service: QrReaderService) => {
    expect(service).toBeTruthy();
  }));
});
