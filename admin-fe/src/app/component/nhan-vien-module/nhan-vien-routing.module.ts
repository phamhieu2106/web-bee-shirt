import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DanhSachNhanVienComponent } from "./danh-sach-nhan-vien/danh-sach-nhan-vien.component";
import { ThemNhanVienComponent } from "./them-nhan-vien/them-nhan-vien.component";
import { SuaNhanVienComponent } from "./sua-nhan-vien/sua-nhan-vien.component";

const nhanVienRoutes: Routes = [
  {
    path: "nhan-vien/ds-nhan-vien",
    component: DanhSachNhanVienComponent,
  },
  {
    path: "nhan-vien/them-nhan-vien",
    component: ThemNhanVienComponent,
  },
  {
    path: "nhan-vien/sua-nhan-vien/:id",
    component: SuaNhanVienComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(nhanVienRoutes)],
  exports: [RouterModule],
})
export class NhanVienRoutingModule {}
