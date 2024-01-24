import { NgModule } from "@angular/core";

import { HoaDonRoutingModule } from "./hoa-don-routing.module";
import { DanhSachHoaDonComponent } from "./danh-sach-hoa-don/danh-sach-hoa-don.component";
import { LayoutModule } from "../layout-module/layout.module";
import { ChiTietHoaDonComponent } from "./chi-tiet-hoa-don/chi-tiet-hoa-don.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { OrderHistoryPaymentComponent } from "./order-history-payment/order-history-payment.component";
import { OrderInfoComponent } from "./order-info/order-info.component";
import { OrderProductComponent } from "./order-product/order-product.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DanhSachHoaDonComponent,
    ChiTietHoaDonComponent,
    OrderTrackingComponent,
    OrderHistoryPaymentComponent,
    OrderInfoComponent,
    OrderProductComponent,
  ],
  imports: [HoaDonRoutingModule, LayoutModule, FormsModule, CommonModule],
})
export class HoaDonModule {}
