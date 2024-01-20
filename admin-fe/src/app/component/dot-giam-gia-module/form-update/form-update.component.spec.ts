import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateComponent } from './form-update.component';

describe('FormUpdateComponent', () => {
  let component: FormUpdateComponent;
  let fixture: ComponentFixture<FormUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUpdateComponent]
    });
    fixture = TestBed.createComponent(FormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
