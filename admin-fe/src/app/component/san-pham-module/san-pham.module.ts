import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { SanPhamRoutingModule } from "./san-pham-routing.module";
import { DanhSachMauSacComponent } from "./mau-sac/danh-sach-mau-sac/danh-sach-mau-sac.component";
import { ThemMauSacComponent } from "./mau-sac/them-mau-sac/them-mau-sac.component";
import { DanhSachSanPhamComponent } from "./san-pham/danh-sach-san-pham/danh-sach-san-pham.component";
import { LayoutModule } from "../layout-module/layout.module";
import { DanhSachChatLieuComponent } from "./chat-lieu/danh-sach-chat-lieu/danh-sach-chat-lieu.component";
import { DanhSachKichCoComponent } from "./kich-co/danh-sach-kich-co/danh-sach-kich-co.component";
import { DanhSachKieuCoAoComponent } from "./kieu-co-ao/danh-sach-kieu-co-ao/danh-sach-kieu-co-ao.component";
import { DanhSachKieuDangComponent } from "./kieu-dang/danh-sach-kieu-dang/danh-sach-kieu-dang.component";
import { DanhSachKieuTayAoComponent } from "./kieu-tay-ao/danh-sach-kieu-tay-ao/danh-sach-kieu-tay-ao.component";
import { DanhSachKieuThietKeComponent } from "./kieu-thiet-ke/danh-sach-kieu-thiet-ke/danh-sach-kieu-thiet-ke.component";

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
  declarations: [
    DanhSachMauSacComponent,
    ThemMauSacComponent,
    DanhSachSanPhamComponent,
    DanhSachChatLieuComponent,
    DanhSachKichCoComponent,
    DanhSachKieuCoAoComponent,
    DanhSachKieuDangComponent,
    DanhSachKieuTayAoComponent,
    DanhSachKieuThietKeComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(sanPhamRoutes), LayoutModule],
})
export class SanPhamModule {}
