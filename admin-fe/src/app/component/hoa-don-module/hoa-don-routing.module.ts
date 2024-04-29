import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DanhSachHoaDonComponent } from "./danh-sach-hoa-don/danh-sach-hoa-don.component";
import { ChiTietHoaDonComponent } from "./chi-tiet-hoa-don/chi-tiet-hoa-don.component";
import { authenticationGuard } from "src/app/guard/authentication.guard";

const hoaDonRoutes: Routes = [
  {
    path: "hoa-don/ql-hoa-don",
    component: DanhSachHoaDonComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "hoa-don/chi-tiet-hoa-don/:id",
    component: ChiTietHoaDonComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(hoaDonRoutes)],
  exports: [RouterModule],
})
export class HoaDonRoutingModule {}
