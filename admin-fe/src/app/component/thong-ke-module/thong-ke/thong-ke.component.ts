import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ChartService } from "src/app/service/chart.service";
import { getISOWeek } from "date-fns";
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
  tongSoDonMoi: number;
  tongSoDonChoGiao: number;
  tongSoDonHuy: number;
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
    this.service.getSoDonMoi().subscribe({
      next: (data) => {
        this.tongSoDonMoi = data;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số đơn mới do ${err.message.message}`
        );
      },
    });
    this.service.getSoDonChoGiao().subscribe({
      next: (data) => {
        this.tongSoDonChoGiao = data;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số đơn đợi giao do ${err.error.message}`
        );
      },
    });
    this.service.getSoDonHuy().subscribe({
      next: (data) => {
        this.tongSoDonHuy = data;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số đơn huỷ do ${err.error.message}`
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

  // Model Charts
  datePhieuGiamGia: any = null;
  dateDotGiamGia: any = null;
  dateSanPham: any = null;
  onChange(result: Date): void {
    if (result) {
      console.log("onChange: ", result.getFullYear());
    }
  }
}
