import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserroleComponent } from './add-userrole.component';

describe('AddUserroleComponent', () => {
  let component: AddUserroleComponent;
  let fixture: ComponentFixture<AddUserroleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserroleComponent]
    });
    fixture = TestBed.createComponent(AddUserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
