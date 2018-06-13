import { TestBed, inject } from '@angular/core/testing';

import { DynamodbSandboxService } from './dynamodb-sandbox.service';

describe('DynamodbSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamodbSandboxService]
    });
  });

  it('should be created', inject([DynamodbSandboxService], (service: DynamodbSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
