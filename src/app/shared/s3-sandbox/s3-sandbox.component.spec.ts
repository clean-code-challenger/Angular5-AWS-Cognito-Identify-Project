import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { S3SandboxComponent } from './s3-sandbox.component';

describe('S3SandboxComponent', () => {
  let component: S3SandboxComponent;
  let fixture: ComponentFixture<S3SandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S3SandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S3SandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
