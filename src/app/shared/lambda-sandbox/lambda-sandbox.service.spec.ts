import { TestBed, inject } from '@angular/core/testing';

import { LambdaSandboxService } from './lambda-sandbox.service';

describe('LambdaSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LambdaSandboxService]
    });
  });

  it('should be created', inject([LambdaSandboxService], (service: LambdaSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
