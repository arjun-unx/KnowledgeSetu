import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectwiseShowComponent } from './subjectwise-show.component';

describe('SubjectwiseShowComponent', () => {
  let component: SubjectwiseShowComponent;
  let fixture: ComponentFixture<SubjectwiseShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectwiseShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectwiseShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
