import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedTeachersComponent } from './subscribed-teachers.component';

describe('SubscribedTeachersComponent', () => {
  let component: SubscribedTeachersComponent;
  let fixture: ComponentFixture<SubscribedTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribedTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
