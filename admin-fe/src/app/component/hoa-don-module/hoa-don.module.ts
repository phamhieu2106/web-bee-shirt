import { NgModule } from "@angular/core";

import { HoaDonRoutingModule } from "./hoa-don-routing.module";
import { DanhSachHoaDonComponent } from "./danh-sach-hoa-don/danh-sach-hoa-don.component";
import { LayoutModule } from "../layout-module/layout.module";
import { ChiTietHoaDonComponent } from './chi-tiet-hoa-don/chi-tiet-hoa-don.component';

@NgModule({
  declarations: [DanhSachHoaDonComponent, ChiTietHoaDonComponent],
  imports: [HoaDonRoutingModule, LayoutModule],
})
export class HoaDonModule {}
