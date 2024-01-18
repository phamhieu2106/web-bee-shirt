import { NgModule } from '@angular/core';

import { KhachHangRoutingModule } from './khach-hang-routing.module';
import { DanhSachKhachHangComponent } from './danh-sach-khach-hang/danh-sach-khach-hang.component';
import { KhachHangDetailComponent } from './khach-hang-detail/khach-hang-detail.component';

@NgModule({
  declarations: [DanhSachKhachHangComponent, KhachHangDetailComponent],
  imports: [KhachHangRoutingModule],
})
export class KhachHangModule {}
