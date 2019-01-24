import { TestBed, inject } from '@angular/core/testing';

import { ComprehendSandboxService } from './comprehend-sandbox.service';

describe('ComprehendSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprehendSandboxService]
    });
  });

  it('should be created', inject([ComprehendSandboxService], (service: ComprehendSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
