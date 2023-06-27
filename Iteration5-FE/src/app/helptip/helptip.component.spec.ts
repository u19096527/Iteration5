import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelptipComponent } from './helptip.component';

describe('HelptipComponent', () => {
  let component: HelptipComponent;
  let fixture: ComponentFixture<HelptipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelptipComponent]
    });
    fixture = TestBed.createComponent(HelptipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
