import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherApprovalComponent } from './teacher-approval.component';

describe('TeacherApprovalComponent', () => {
  let component: TeacherApprovalComponent;
  let fixture: ComponentFixture<TeacherApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
