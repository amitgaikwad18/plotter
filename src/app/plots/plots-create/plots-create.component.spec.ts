import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsCreateComponent } from './plots-create.component';

describe('PlotsCreateComponent', () => {
  let component: PlotsCreateComponent;
  let fixture: ComponentFixture<PlotsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
