import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpHelperComponent } from './np-helper.component';

describe('NpHelperComponent', () => {
  let component: NpHelperComponent;
  let fixture: ComponentFixture<NpHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
