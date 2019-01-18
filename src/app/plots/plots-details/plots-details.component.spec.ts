import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsDetailsComponent } from './plots-details.component';

describe('PlotsDetailsComponent', () => {
  let component: PlotsDetailsComponent;
  let fixture: ComponentFixture<PlotsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
