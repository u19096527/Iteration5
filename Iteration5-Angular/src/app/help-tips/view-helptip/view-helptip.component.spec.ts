import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHelptipComponent } from './view-helptip.component';

describe('ViewHelptipComponent', () => {
  let component: ViewHelptipComponent;
  let fixture: ComponentFixture<ViewHelptipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHelptipComponent]
    });
    fixture = TestBed.createComponent(ViewHelptipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
