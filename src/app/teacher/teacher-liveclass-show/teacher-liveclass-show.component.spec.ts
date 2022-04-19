import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLiveclassShowComponent } from './teacher-liveclass-show.component';

describe('TeacherLiveclassShowComponent', () => {
  let component: TeacherLiveclassShowComponent;
  let fixture: ComponentFixture<TeacherLiveclassShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherLiveclassShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLiveclassShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
