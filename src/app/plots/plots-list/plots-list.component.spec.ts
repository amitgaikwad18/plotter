import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsListComponent } from './plots-list.component';

describe('PlotsListComponent', () => {
  let component: PlotsListComponent;
  let fixture: ComponentFixture<PlotsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
