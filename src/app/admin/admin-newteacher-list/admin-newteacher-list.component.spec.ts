import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewteacherListComponent } from './admin-newteacher-list.component';

describe('AdminNewteacherListComponent', () => {
  let component: AdminNewteacherListComponent;
  let fixture: ComponentFixture<AdminNewteacherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewteacherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewteacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
