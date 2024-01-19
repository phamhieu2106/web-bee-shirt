import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DanhSachMauSacComponent } from "./mau-sac/danh-sach-mau-sac/danh-sach-mau-sac.component";
import { DanhSachSanPhamComponent } from "./san-pham/danh-sach-san-pham/danh-sach-san-pham.component";
import { DanhSachChatLieuComponent } from "./chat-lieu/danh-sach-chat-lieu/danh-sach-chat-lieu.component";
import { DanhSachKichCoComponent } from "./kich-co/danh-sach-kich-co/danh-sach-kich-co.component";
import { DanhSachKieuDangComponent } from "./kieu-dang/danh-sach-kieu-dang/danh-sach-kieu-dang.component";
import { DanhSachKieuThietKeComponent } from "./kieu-thiet-ke/danh-sach-kieu-thiet-ke/danh-sach-kieu-thiet-ke.component";
import { DanhSachKieuTayAoComponent } from "./kieu-tay-ao/danh-sach-kieu-tay-ao/danh-sach-kieu-tay-ao.component";
import { DanhSachKieuCoAoComponent } from "./kieu-co-ao/danh-sach-kieu-co-ao/danh-sach-kieu-co-ao.component";

const sanPhamRoutes: Routes = [
  {
    path: "sp/ds-san-pham",
    component: DanhSachSanPhamComponent,
  },
  {
    path: "mau-sac/ds-mau-sac",
    component: DanhSachMauSacComponent,
  },
  {
    path: "kich-co/ds-kich-co",
    component: DanhSachKichCoComponent,
  },
  {
    path: "kieu-dang/ds-kieu-dang",
    component: DanhSachKieuDangComponent,
  },
  {
    path: "kieu-thiet-ke/ds-kieu-thiet-ke",
    component: DanhSachKieuThietKeComponent,
  },
  {
    path: "kieu-tay-ao/ds-kieu-tay-ao",
    component: DanhSachKieuTayAoComponent,
  },
  {
    path: "kieu-co-ao/ds-kieu-co-ao",
    component: DanhSachKieuCoAoComponent,
  },
  {
    path: "chat-lieu/ds-chat-lieu",
    component: DanhSachChatLieuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(sanPhamRoutes)],
  exports: [RouterModule],
})
export class SanPhamRoutingModule {}
