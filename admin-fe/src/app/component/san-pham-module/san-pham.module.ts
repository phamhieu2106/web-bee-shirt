import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SanPhamRoutingModule } from "./san-pham-routing.module";
import { DanhSachMauSacComponent } from "./mau-sac/danh-sach-mau-sac/danh-sach-mau-sac.component";
import { ThemMauSacComponent } from "./mau-sac/them-mau-sac/them-mau-sac.component";
import { DanhSachSanPhamComponent } from "./san-pham/danh-sach-san-pham/danh-sach-san-pham.component";
import { DanhSachChatLieuComponent } from "./chat-lieu/danh-sach-chat-lieu/danh-sach-chat-lieu.component";
import { DanhSachKichCoComponent } from "./kich-co/danh-sach-kich-co/danh-sach-kich-co.component";
import { DanhSachKieuCoAoComponent } from "./kieu-co-ao/danh-sach-kieu-co-ao/danh-sach-kieu-co-ao.component";
import { DanhSachKieuDangComponent } from "./kieu-dang/danh-sach-kieu-dang/danh-sach-kieu-dang.component";
import { DanhSachKieuTayAoComponent } from "./kieu-tay-ao/danh-sach-kieu-tay-ao/danh-sach-kieu-tay-ao.component";
import { DanhSachKieuThietKeComponent } from "./kieu-thiet-ke/danh-sach-kieu-thiet-ke/danh-sach-kieu-thiet-ke.component";
import { LayoutModule } from "../layout-module/layout.module";

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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    SanPhamRoutingModule,
  ],
})
export class SanPhamModule {}
