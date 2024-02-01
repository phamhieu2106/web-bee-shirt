import { NgModule } from "@angular/core";

import { NgxScannerQrcodeModule, LOAD_WASM } from "ngx-scanner-qrcode";

import { NhanVienRoutingModule } from "./nhan-vien-routing.module";
import { DanhSachNhanVienComponent } from "./danh-sach-nhan-vien/danh-sach-nhan-vien.component";
import { ThemNhanVienComponent } from "./them-nhan-vien/them-nhan-vien.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "../layout-module/layout.module";
import { SuaNhanVienComponent } from "./sua-nhan-vien/sua-nhan-vien.component";
import { ChiTietNhanVienComponent } from "./chi-tiet-nhan-vien/chi-tiet-nhan-vien.component";

// Necessary to solve the problem of losing internet connection
LOAD_WASM().subscribe();

@NgModule({
  declarations: [
    DanhSachNhanVienComponent,
    ThemNhanVienComponent,
    SuaNhanVienComponent,
    ChiTietNhanVienComponent,
  ],
  imports: [
    NhanVienRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    NgxScannerQrcodeModule,
  ],
})
export class NhanVienModule {}
