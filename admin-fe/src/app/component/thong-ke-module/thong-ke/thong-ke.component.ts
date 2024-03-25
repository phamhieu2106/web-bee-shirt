import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ChartService } from "src/app/service/chart.service";
import { getISOWeek } from "date-fns";
import { LineChartSaleComponent } from "../line-chart-sale/line-chart-sale.component";
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
  @ViewChild(LineChartSaleComponent) chartSaleComponent: LineChartSaleComponent;
  listDoanhThuTrongNamHienTai: number[] = [];
  listDoanhThuTrongNamTruoc: number[] = [];
  constructor(private service: ChartService, private toastSrc: ToastrService) {}
  ngOnInit(): void {
    this.loadChart();
    setTimeout(() => {
      this.listDoanhThuTrongNamHienTai =
        this.chartSaleComponent.listDoanhThuTrongNamHienTai;
      this.listDoanhThuTrongNamTruoc =
        this.chartSaleComponent.listDoanhThuTrongNamTruoc;
    }, 1000);
  }
  loadChart(): void {
    this.service.getSoDonHoanThanh().subscribe({
      next: (data) => {
        this.tongSoDonHoanThanh = data;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số đơn hoàn thành do ${err.message}`
        );
      },
    });
    this.service.getSoDonMoi().subscribe({
      next: (data) => {
        this.tongSoDonMoi = data;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số đơn mới do ${err.message}`
        );
      },
    });
    this.service.getSoDonChoGiao().subscribe({
      next: (data) => {
        this.tongSoDonChoGiao = data;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số đơn đợi giao do ${err.message}`
        );
      },
    });
    this.service.getSoDonHuy().subscribe({
      next: (data) => {
        this.tongSoDonHuy = data;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số đơn huỷ do ${err.message}`
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
  datePhieuGiamGia: Date = new Date(2024, 0, 1);
  dateDotGiamGia: Date = new Date(2024, 0, 1);
  dateSanPham: Date = new Date(2024, 0, 1);
  //
}
