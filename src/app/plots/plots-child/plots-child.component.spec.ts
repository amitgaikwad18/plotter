import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsChildComponent } from './plots-child.component';

describe('PlotsChildComponent', () => {
  let component: PlotsChildComponent;
  let fixture: ComponentFixture<PlotsChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotsChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
