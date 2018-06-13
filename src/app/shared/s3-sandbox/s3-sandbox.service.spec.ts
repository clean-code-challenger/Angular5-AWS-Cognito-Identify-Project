import { TestBed, inject } from '@angular/core/testing';

import { S3SandboxService } from './s3-sandbox.service';

describe('S3SandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [S3SandboxService]
    });
  });

  it('should be created', inject([S3SandboxService], (service: S3SandboxService) => {
    expect(service).toBeTruthy();
  }));
});
