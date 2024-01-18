import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachMauSacComponent } from './danh-sach-mau-sac.component';

describe('DanhSachMauSacComponent', () => {
  let component: DanhSachMauSacComponent;
  let fixture: ComponentFixture<DanhSachMauSacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhSachMauSacComponent]
    });
    fixture = TestBed.createComponent(DanhSachMauSacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
