import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDocumentComponent } from './course-document.component';

describe('CourseDocumentComponent', () => {
  let component: CourseDocumentComponent;
  let fixture: ComponentFixture<CourseDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
