import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquaintanceTableComponent } from './acquaintance-table.component';

describe('AcquaintanceTableComponent', () => {
  let component: AcquaintanceTableComponent;
  let fixture: ComponentFixture<AcquaintanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquaintanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquaintanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
