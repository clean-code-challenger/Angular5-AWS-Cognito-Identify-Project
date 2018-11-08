import { TestBed, inject } from '@angular/core/testing';

import { FirehoseSandboxService } from './firehose-sandbox.service';

describe('FirehoseSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirehoseSandboxService]
    });
  });

  it('should be created', inject([FirehoseSandboxService], (service: FirehoseSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
