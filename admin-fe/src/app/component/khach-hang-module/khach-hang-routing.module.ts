import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DanhSachKhachHangComponent } from "./danh-sach-khach-hang/danh-sach-khach-hang.component";
import { KhachHangDetailComponent } from "./khach-hang-detail/khach-hang-detail.component";
import { ThemKhachHangComponent } from "./them-khach-hang/them-khach-hang.component";
import { SuaKhachHangComponent } from "./sua-khach-hang/sua-khach-hang.component";
import { authenticationGuard } from "src/app/guard/authentication.guard";

const khachHangRoutes: Routes = [
  {
    path: "khach-hang/ds-khach-hang",
    component: DanhSachKhachHangComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "khach-hang/detail/:id",
    component: KhachHangDetailComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "khach-hang/them-khach-hang",
    component: ThemKhachHangComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "khach-hang/sua-khach-hang/:id",
    component: SuaKhachHangComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(khachHangRoutes)],
  exports: [RouterModule],
})
export class KhachHangRoutingModule {}
