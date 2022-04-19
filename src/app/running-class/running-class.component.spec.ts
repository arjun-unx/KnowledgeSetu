import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningClassComponent } from './running-class.component';

describe('RunningClassComponent', () => {
  let component: RunningClassComponent;
  let fixture: ComponentFixture<RunningClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
