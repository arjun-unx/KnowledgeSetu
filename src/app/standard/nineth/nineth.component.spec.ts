import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NinethComponent } from './nineth.component';

describe('NinethComponent', () => {
  let component: NinethComponent;
  let fixture: ComponentFixture<NinethComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NinethComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NinethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
