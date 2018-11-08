import { TestBed, inject } from '@angular/core/testing';

import { KinesisSandboxService } from './kinesis-sandbox.service';

describe('KinesisSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KinesisSandboxService]
    });
  });

  it('should be created', inject([KinesisSandboxService], (service: KinesisSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
