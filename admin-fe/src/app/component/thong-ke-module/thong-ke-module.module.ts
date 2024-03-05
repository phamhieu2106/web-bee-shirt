import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThongKeModuleRoutingModule } from "./thong-ke-module-routing.module";
import { ThongKeComponent } from "./thong-ke/thong-ke.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { LayoutModule } from "../layout-module/layout.module";
import { LineChartCustomerComponent } from "./line-chart-customer/line-chart-customer.component";
import { LineChartSaleComponent } from './line-chart-sale/line-chart-sale.component';

@NgModule({
  declarations: [
    ThongKeComponent,
    LineChartComponent,
    LineChartCustomerComponent,
    LineChartSaleComponent,
  ],
  imports: [CommonModule, ThongKeModuleRoutingModule, LayoutModule],
})
export class ThongKeModuleModule {}
