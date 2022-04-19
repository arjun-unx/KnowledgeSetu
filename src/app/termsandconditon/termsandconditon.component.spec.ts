import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandconditonComponent } from './termsandconditon.component';

describe('TermsandconditonComponent', () => {
  let component: TermsandconditonComponent;
  let fixture: ComponentFixture<TermsandconditonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsandconditonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsandconditonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
