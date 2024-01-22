import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DanhSachHoaDonComponent } from "./danh-sach-hoa-don/danh-sach-hoa-don.component";
import { ChiTietHoaDonComponent } from "./chi-tiet-hoa-don/chi-tiet-hoa-don.component";

const hoaDonRoutes: Routes = [
  {
    path: "hoa-don/ql-hoa-don",
    component: DanhSachHoaDonComponent,
  },
  {
    path: "hoa-don/chi-tiet-hoa-don/:id",
    component: ChiTietHoaDonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(hoaDonRoutes)],
  exports: [RouterModule],
})
export class HoaDonRoutingModule {}
