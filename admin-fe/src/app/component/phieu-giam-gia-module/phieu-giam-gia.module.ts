import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PhieuGiamGiaRoutingModule } from './phieu-giam-gia-routing.module';
import { DanhSachPhieuComponent } from './danh-sach-phieu/danh-sach-phieu.component';
import { ThemPhieuComponent } from './them-phieu/them-phieu.component';
import { LayoutModule } from "../layout-module/layout.module";



@NgModule({
  declarations: [
    DanhSachPhieuComponent,
    ThemPhieuComponent,

  ],
  imports: [
    PhieuGiamGiaRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,],
})
export class PhieuGiamGiaModule { }
