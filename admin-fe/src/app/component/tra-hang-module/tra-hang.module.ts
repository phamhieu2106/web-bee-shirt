import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TraHangRoutingModule } from "./tra-hang-routing.module";
import { TraHangComponent } from "./tra-hang/tra-hang.component";
import { LayoutModule } from "../layout-module/layout.module";
import { TimKiemHoaDonComponent } from "./tim-kiem-hoa-don/tim-kiem-hoa-don.component";
import { FormsModule } from "@angular/forms";
import { ChiTietHoaDonComponent } from "./chi-tiet-hoa-don/chi-tiet-hoa-don.component";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
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

@NgModule({
  declarations: [
    TraHangComponent,
    TimKiemHoaDonComponent,
    ChiTietHoaDonComponent,
    TraHangThanhCongComponent,
  ],
  imports: [
    CommonModule,
    TraHangRoutingModule,
    LayoutModule,
    FormsModule,
    NzSkeletonModule,
    NzTableModule,
    NzDividerModule,
    NzTypographyModule,
    NzIconModule,
    NzListModule,
    NzButtonModule,
    NzModalModule,
    NzRadioModule,
    NzResultModule,
  ],
})
export class TraHangModule {}
