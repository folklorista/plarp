import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquaintanceFormComponent } from './acquaintance-form.component';

describe('AcquaintanceFormComponent', () => {
  let component: AcquaintanceFormComponent;
  let fixture: ComponentFixture<AcquaintanceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquaintanceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquaintanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
