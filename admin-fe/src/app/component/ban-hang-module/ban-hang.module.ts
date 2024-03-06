import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BanHangComponent } from "./ban-hang/ban-hang.component";
import { BanHangRoutingModule } from "./ban-hang-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LayoutModule } from "../layout-module/layout.module";
import { CommonComponentModule } from "../common-component/common-component.module";
import { ThanhToanComponent } from './thanh-toan/thanh-toan.component';
import { GiaoHangComponent } from './giao-hang/giao-hang.component';
import { GiamGiaComponent } from './giam-gia/giam-gia.component';

@NgModule({
  declarations: [BanHangComponent, ThanhToanComponent, GiaoHangComponent, GiamGiaComponent],
  imports: [
    CommonModule,
    BanHangRoutingModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    CommonComponentModule,
    ReactiveFormsModule,
  ],
})
export class BanHangModule {}
