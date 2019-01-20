import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuhackitComponent } from './cuhackit.component';

describe('CuhackitComponent', () => {
  let component: CuhackitComponent;
  let fixture: ComponentFixture<CuhackitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuhackitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuhackitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
