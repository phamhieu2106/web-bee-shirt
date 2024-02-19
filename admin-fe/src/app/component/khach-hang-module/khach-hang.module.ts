import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { KhachHangRoutingModule } from "./khach-hang-routing.module";
import { DanhSachKhachHangComponent } from "./danh-sach-khach-hang/danh-sach-khach-hang.component";
import { KhachHangDetailComponent } from "./khach-hang-detail/khach-hang-detail.component";
import { LayoutModule } from "../layout-module/layout.module";
import { ThemKhachHangComponent } from "./them-khach-hang/them-khach-hang.component";
import { SuaKhachHangComponent } from "./sua-khach-hang/sua-khach-hang.component";
import { DiaChiDetailComponent } from "./dia-chi-detail/dia-chi-detail.component";
import { NgxScannerQrcodeModule } from "ngx-scanner-qrcode";

@NgModule({
  declarations: [
    DanhSachKhachHangComponent,
    KhachHangDetailComponent,
    ThemKhachHangComponent,
    SuaKhachHangComponent,
    DiaChiDetailComponent,
  ],
  imports: [
    KhachHangRoutingModule,
    LayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxScannerQrcodeModule,
  ],
})
export class KhachHangModule {}
