import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DanhSachNhanVienComponent } from "./danh-sach-nhan-vien/danh-sach-nhan-vien.component";
import { ThemNhanVienComponent } from "./them-nhan-vien/them-nhan-vien.component";
import { SuaNhanVienComponent } from "./sua-nhan-vien/sua-nhan-vien.component";
import { adminAuthenticationGuard } from "src/app/guard/admin-guard.guard";

const nhanVienRoutes: Routes = [
  {
    path: "nhan-vien/ds-nhan-vien",
    component: DanhSachNhanVienComponent,
    canActivate: [adminAuthenticationGuard],
  },
  {
    path: "nhan-vien/them-nhan-vien",
    component: ThemNhanVienComponent,
    canActivate: [adminAuthenticationGuard],
  },
  {
    path: "nhan-vien/sua-nhan-vien/:id",
    component: SuaNhanVienComponent,
    canActivate: [adminAuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nhanVienRoutes)],
  exports: [RouterModule],
})
export class NhanVienRoutingModule {}
