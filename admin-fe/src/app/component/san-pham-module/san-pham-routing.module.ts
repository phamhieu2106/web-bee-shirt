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
import { authenticationGuard } from "src/app/guard/authentication.guard";
import { ThemSanPhamChiTietComponent } from "./san-pham/them-san-pham-chi-tiet/them-san-pham-chi-tiet.component";
import { DsSanPhamChiTietComponent } from "./san-pham/ds-san-pham-chi-tiet/ds-san-pham-chi-tiet.component";

const sanPhamRoutes: Routes = [
  {
    path: "sp/ds-sp-chi-tiet/:sanPhamId",
    component: DsSanPhamChiTietComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "sp/them-sp-chi-tiet/:sanPhamId",
    component: ThemSanPhamChiTietComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "sp/ds-san-pham",
    component: DanhSachSanPhamComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "mau-sac/ds-mau-sac",
    component: DanhSachMauSacComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "kich-co/ds-kich-co",
    component: DanhSachKichCoComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "kieu-dang/ds-kieu-dang",
    component: DanhSachKieuDangComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "kieu-thiet-ke/ds-kieu-thiet-ke",
    component: DanhSachKieuThietKeComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "kieu-tay-ao/ds-kieu-tay-ao",
    component: DanhSachKieuTayAoComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "kieu-co-ao/ds-kieu-co-ao",
    component: DanhSachKieuCoAoComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "chat-lieu/ds-chat-lieu",
    component: DanhSachChatLieuComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sanPhamRoutes)],
  exports: [RouterModule],
})
export class SanPhamRoutingModule {}
