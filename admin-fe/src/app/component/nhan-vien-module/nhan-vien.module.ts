import { NgModule } from "@angular/core";

import { NhanVienRoutingModule } from "./nhan-vien-routing.module";
import { DanhSachNhanVienComponent } from "./danh-sach-nhan-vien/danh-sach-nhan-vien.component";
import { ThemNhanVienComponent } from "./them-nhan-vien/them-nhan-vien.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { LayoutModule } from "../layout-module/layout.module";
import { SuaNhanVienComponent } from './sua-nhan-vien/sua-nhan-vien.component';

@NgModule({
  declarations: [DanhSachNhanVienComponent, ThemNhanVienComponent, SuaNhanVienComponent],
  imports: [NhanVienRoutingModule, BrowserModule, FormsModule, LayoutModule],
})
export class NhanVienModule {}
