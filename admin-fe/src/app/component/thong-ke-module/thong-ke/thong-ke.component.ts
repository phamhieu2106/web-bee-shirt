import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ChartService } from "src/app/service/chart.service";

@Component({
  selector: "app-thong-ke",
  templateUrl: "./thong-ke.component.html",
  styleUrls: ["./thong-ke.component.css"],
})
export class ThongKeComponent implements OnInit {
  public tenChart: string = "year";
  public tenChartCustomer: string = "year";
  public tenChartSale: string = "year";
  // Các Biến
  tongSoDonHoanThanh: number;
  //

  constructor(private service: ChartService, private toastSrc: ToastrService) {}
  ngOnInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    this.service.getSoDonHoanThanh().subscribe({
      next: (data) => {
        this.tongSoDonHoanThanh = data;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số đơn hoàn thành do ${err.message.message}`
        );
      },
    });
  }

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
