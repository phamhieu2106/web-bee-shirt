import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TraHangRoutingModule } from "./tra-hang-routing.module";
import { TraHangComponent } from "./tra-hang/tra-hang.component";
import { LayoutModule } from "../layout-module/layout.module";
import { TimKiemHoaDonComponent } from "./tim-kiem-hoa-don/tim-kiem-hoa-don.component";
import { FormsModule } from "@angular/forms";
import { ChiTietHoaDonComponent } from "./chi-tiet-hoa-don/chi-tiet-hoa-don.component";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzListModule } from "ng-zorro-antd/list";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { TraHangThanhCongComponent } from "./tra-hang-thanh-cong/tra-hang-thanh-cong.component";
import { NzResultModule } from "ng-zorro-antd/result";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzInputModule } from "ng-zorro-antd/input";
import { QuantityInputComponent } from "./quantity-input/quantity-input.component";
import { NzCardModule } from "ng-zorro-antd/card";
import { QuyDinhComponent } from "./quy-dinh/quy-dinh.component";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NgxScannerQrcodeModule, LOAD_WASM } from "ngx-scanner-qrcode";

// Necessary to solve the problem of losing internet connection
LOAD_WASM().subscribe();

@NgModule({
  declarations: [
    TraHangComponent,
    TimKiemHoaDonComponent,
    ChiTietHoaDonComponent,
    TraHangThanhCongComponent,
    QuantityInputComponent,
    QuyDinhComponent,
  ],
  imports: [
    CommonModule,
    TraHangRoutingModule,
    LayoutModule,
    FormsModule,
    NzTableModule,
    NzDividerModule,
    NzTypographyModule,
    NzIconModule,
    NzListModule,
    NzButtonModule,
    NzModalModule,
    NzRadioModule,
    NzResultModule,
    NzEmptyModule,
    NzInputModule,
    NzCardModule,
    NzGridModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzToolTipModule,
    NgxScannerQrcodeModule,
  ],
})
export class TraHangModule {}
