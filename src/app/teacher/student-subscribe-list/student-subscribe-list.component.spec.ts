import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubscribeListComponent } from './student-subscribe-list.component';

describe('StudentSubscribeListComponent', () => {
  let component: StudentSubscribeListComponent;
  let fixture: ComponentFixture<StudentSubscribeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSubscribeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubscribeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
