import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelptipComponent } from './add-helptip.component';

describe('AddHelptipComponent', () => {
  let component: AddHelptipComponent;
  let fixture: ComponentFixture<AddHelptipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHelptipComponent]
    });
    fixture = TestBed.createComponent(AddHelptipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
