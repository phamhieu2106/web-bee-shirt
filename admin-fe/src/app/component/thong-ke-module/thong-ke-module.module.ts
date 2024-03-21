import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThongKeModuleRoutingModule } from "./thong-ke-module-routing.module";
import { ThongKeComponent } from "./thong-ke/thong-ke.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { LayoutModule } from "../layout-module/layout.module";
import { LineChartCustomerComponent } from "./line-chart-customer/line-chart-customer.component";
import { LineChartSaleComponent } from "./line-chart-sale/line-chart-sale.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { PieDiscountChartComponent } from "./pie-discount-chart/pie-discount-chart.component";
import { PolarProductChartComponent } from "./polar-product-chart/polar-product-chart.component";
import { BarReviewChartComponent } from "./bar-review-chart/bar-review-chart.component";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { FormsModule } from "@angular/forms";
import { NoDataComponent } from "./no-data/no-data.component";
import { NzEmptyModule } from "ng-zorro-antd/empty";

@NgModule({
  declarations: [
    ThongKeComponent,
    LineChartComponent,
    LineChartCustomerComponent,
    LineChartSaleComponent,
    PieChartComponent,
    PieDiscountChartComponent,
    PolarProductChartComponent,
    BarReviewChartComponent,
    NoDataComponent,
  ],
  imports: [
    CommonModule,
    ThongKeModuleRoutingModule,
    LayoutModule,
    NzDatePickerModule,
    FormsModule,
    NzEmptyModule,
  ],
})
export class ThongKeModuleModule {}
