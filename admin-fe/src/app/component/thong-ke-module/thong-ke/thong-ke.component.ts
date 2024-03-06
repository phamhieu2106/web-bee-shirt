import { Component } from "@angular/core";

@Component({
  selector: "app-thong-ke",
  templateUrl: "./thong-ke.component.html",
  styleUrls: ["./thong-ke.component.css"],
})
export class ThongKeComponent {
  public tenChart: string = "year";
  public tenChartCustomer: string = "year";
  public tenChartSale: string = "year";
  public setChart(chart: string) {
    this.tenChart = chart;
  }
  public setCustomerChart(customerChart: string) {
    this.tenChartCustomer = customerChart;
  }
  public setSaleChart(customerChart: string) {
    this.tenChartSale = customerChart;
  }
}
