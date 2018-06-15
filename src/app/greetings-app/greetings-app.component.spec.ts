import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingsAppComponent } from './greetings-app.component';

describe('GreetingsAppComponent', () => {
  let component: GreetingsAppComponent;
  let fixture: ComponentFixture<GreetingsAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetingsAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
