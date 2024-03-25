import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BanHangComponent } from "./ban-hang/ban-hang.component";
import { BanHangRoutingModule } from "./ban-hang-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LayoutModule } from "../layout-module/layout.module";
import { CommonComponentModule } from "../common-component/common-component.module";
import { ThanhToanComponent } from "./thanh-toan/thanh-toan.component";
import { GiaoHangComponent } from "./giao-hang/giao-hang.component";
import { GiamGiaComponent } from "./giam-gia/giam-gia.component";
import { HoaDonModule } from "../hoa-don-module/hoa-don.module";
import { PhieuGiamGiaComponent } from "./phieu-giam-gia/phieu-giam-gia.component";
import { SearchProductDetailComponent } from "./search-product-detail/search-product-detail.component";

@NgModule({
  declarations: [
    BanHangComponent,
    ThanhToanComponent,
    GiaoHangComponent,
    GiamGiaComponent,
    PhieuGiamGiaComponent,
    SearchProductDetailComponent,
  ],
  imports: [
    CommonModule,
    BanHangRoutingModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    CommonComponentModule,
    ReactiveFormsModule,
    HoaDonModule,
  ],
  exports: [SearchProductDetailComponent],
})
export class BanHangModule {}
