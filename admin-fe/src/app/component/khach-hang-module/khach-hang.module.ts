import { NgModule } from '@angular/core';

import { KhachHangRoutingModule } from './khach-hang-routing.module';
import { DanhSachKhachHangComponent } from './danh-sach-khach-hang/danh-sach-khach-hang.component';
import { KhachHangDetailComponent } from './khach-hang-detail/khach-hang-detail.component';
import { LayoutModule } from '../layout-module/layout.module';
import { ThemKhachHangComponent } from './them-khach-hang/them-khach-hang.component';
import { SuaKhachHangComponent } from './sua-khach-hang/sua-khach-hang.component';

@NgModule({
  declarations: [DanhSachKhachHangComponent, KhachHangDetailComponent,ThemKhachHangComponent,SuaKhachHangComponent],
  imports: [KhachHangRoutingModule,LayoutModule],
})
export class KhachHangModule {}
