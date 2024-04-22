import { NgModule } from "@angular/core";

import { HoaDonRoutingModule } from "./hoa-don-routing.module";
import { DanhSachHoaDonComponent } from "./danh-sach-hoa-don/danh-sach-hoa-don.component";
import { LayoutModule } from "../layout-module/layout.module";
import { ChiTietHoaDonComponent } from "./chi-tiet-hoa-don/chi-tiet-hoa-don.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { OrderHistoryPaymentComponent } from "./order-history-payment/order-history-payment.component";
import { OrderProductComponent } from "./order-product/order-product.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TrangThaiHoaDonComponent } from "./trang-thai-hoa-don/trang-thai-hoa-don.component";
import { LoaiHoaDonComponent } from "./loai-hoa-don/loai-hoa-don.component";
import { PhuongThucThanhToanComponent } from "./phuong-thuc-thanh-toan/phuong-thuc-thanh-toan.component";
import { CommonComponentModule } from "../common-component/common-component.module";
import { AuthModule } from "../auth-module/auth.module";
import { SearchProductDetailComponent } from "./search-product-detail/search-product-detail.component";
import { HoanTienComponent } from './hoan-tien/hoan-tien.component';

@NgModule({
  declarations: [
    DanhSachHoaDonComponent,
    ChiTietHoaDonComponent,
    OrderTrackingComponent,
    OrderHistoryPaymentComponent,
    OrderProductComponent,
    TrangThaiHoaDonComponent,
    LoaiHoaDonComponent,
    PhuongThucThanhToanComponent,
    SearchProductDetailComponent,
    HoanTienComponent,
  ],
  imports: [
    HoaDonRoutingModule,
    LayoutModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CommonComponentModule,
  ],
  exports: [PhuongThucThanhToanComponent],
})
export class HoaDonModule {}
