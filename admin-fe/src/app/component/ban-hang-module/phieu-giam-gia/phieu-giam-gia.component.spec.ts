import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuGiamGiaComponent } from './phieu-giam-gia.component';

describe('PhieuGiamGiaComponent', () => {
  let component: PhieuGiamGiaComponent;
  let fixture: ComponentFixture<PhieuGiamGiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhieuGiamGiaComponent]
    });
    fixture = TestBed.createComponent(PhieuGiamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
