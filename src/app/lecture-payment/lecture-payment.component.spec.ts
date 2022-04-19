import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturePaymentComponent } from './lecture-payment.component';

describe('LecturePaymentComponent', () => {
  let component: LecturePaymentComponent;
  let fixture: ComponentFixture<LecturePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
