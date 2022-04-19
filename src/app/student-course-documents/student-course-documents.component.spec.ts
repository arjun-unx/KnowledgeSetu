import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseDocumentsComponent } from './student-course-documents.component';

describe('StudentCourseDocumentsComponent', () => {
  let component: StudentCourseDocumentsComponent;
  let fixture: ComponentFixture<StudentCourseDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
