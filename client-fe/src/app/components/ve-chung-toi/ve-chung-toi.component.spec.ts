import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeChungToiComponent } from './ve-chung-toi.component';

describe('VeChungToiComponent', () => {
  let component: VeChungToiComponent;
  let fixture: ComponentFixture<VeChungToiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeChungToiComponent]
    });
    fixture = TestBed.createComponent(VeChungToiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
