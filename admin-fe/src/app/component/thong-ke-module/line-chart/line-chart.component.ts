import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { ChartService } from "src/app/service/chart.service";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnInit {
  public chartLoaded: any;
  chart: any;
  @Input() tenChart: string;
  private currentYear: number = new Date().getFullYear();
  private currentMonth: string[] = [];
  private currentWeek: string[] = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
  private currentDay: string[] = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ Nhật",
  ];

  // Biến
  listTongSoDonHoanThanhTheoNam: number[];
  listTongSoDonHoanThanhTheoNamTruoc: number[];

  listTongSoDonHoanThanhTheoThang: number[];
  listTongSoDonHoanThanhTheoThangTruoc: number[];

  listTongSoDonHoanThanhTrongTuan: number[];
  listTongSoDonHoanThanhTrongTuanTruoc: number[];
  //
  constructor(private service: ChartService, private toastSrc: ToastrService) {}

  ngOnInit(): void {
    this.getMonths();
    this.loadChartDonHangHoanThanh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["tenChart"] && !changes["tenChart"].firstChange) {
      // Gọi phương thức tạo biểu đồ tương ứng khi giá trị tenChart thay đổi
      this.switchChart(this.tenChart);
    }
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  public getMonths() {
    for (let i = 0; i < 12; i++) {
      this.currentMonth.push(
        `${this.currentYear}-${(i + 1).toString().padStart(2, "0")}`
      );
    }
  }

  public switchChart(chart: string) {
    if (chart == "week") {
      this.createChartDay();
    } else if (chart == "month") {
      this.createChartWeek();
    } else if (chart == "year") {
      this.createChartYear();
    }
  }

  public createChartDay() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }
    this.chart = new Chart("MyChart", {
      type: "line",
      data: {
        labels: this.currentDay,

        datasets: [
          {
            label: "Tuần Trước",
            data: this.listTongSoDonHoanThanhTrongTuanTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Tuần Hiện Tại",
            data: this.listTongSoDonHoanThanhTrongTuan,
            backgroundColor: [
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
            ],
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            ticks: {
              // Đơn vị của trục y
              callback: function (value, index, values) {
                // Nếu giá trị hiện tại là giá trị cuối cùng
                if (index === values.length - 1) {
                  return value + "+ Đơn"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Đơn"; // Giữ nguyên các giá trị khác
                }
              },
            },
          },
        },
      },
    });
  }

  public createChartWeek() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }
    this.chart = new Chart("MyChart", {
      type: "line",
      data: {
        labels: this.currentWeek,

        datasets: [
          {
            label: "Tháng Trước",
            data: this.listTongSoDonHoanThanhTheoThangTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Tháng Hiện Tại",
            data: this.listTongSoDonHoanThanhTheoThang,
            backgroundColor: [
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
            ],
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            ticks: {
              // Đơn vị của trục y
              callback: function (value, index, values) {
                // Nếu giá trị hiện tại là giá trị cuối cùng
                if (index === values.length - 1) {
                  return value + "+ Đơn"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Đơn"; // Giữ nguyên các giá trị khác
                }
              },
            },
          },
        },
      },
    });
  }

  public createChartYear() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }
    this.chart = new Chart("MyChart", {
      type: "line",
      data: {
        labels: this.currentMonth,

        datasets: [
          {
            label: "Năm Trước",
            data: this.listTongSoDonHoanThanhTheoNamTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Năm Hiện Tại",
            data: this.listTongSoDonHoanThanhTheoNam,
            backgroundColor: [
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
              "limegreen",
            ], // Sử dụng mảng màu nền
          },
        ],
      },
      options: {
        animation: {},
        aspectRatio: 2.5,
        scales: {
          y: {
            ticks: {
              // Đơn vị của trục y
              callback: function (value, index, values) {
                // Nếu giá trị hiện tại là giá trị cuối cùng
                if (index === values.length - 1) {
                  return value + "+ Đơn"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Đơn"; // Giữ nguyên các giá trị khác
                }
              },
            },
          },
        },
      },
    });
  }

  public loadChartDonHangHoanThanh(): void {
    forkJoin({
      soDonHoanThanhTrongNamTruoc:
        this.service.getSoDonHoanThanhTrongNamTruoc(),
      soDonHoanThanhTrongNam: this.service.getSoDonHoanThanhTrongNam(),
      soDonHoanThanhTrongTuan: this.service.getSoDonHoanThanhTrongTuan(),
      soDonHoanThanhTrongTuanTruoc:
        this.service.getSoDonHoanThanhTrongTuanTruoc(),
      soDonHoanThanhTrongThang: this.service.getSoDonHoanThanhTrongThang(),
      soDonHoanThanhTrongThangTruoc:
        this.service.getSoDonHoanThanhTrongThangTruoc(),
    }).subscribe({
      next: (results) => {
        this.listTongSoDonHoanThanhTheoNam = results.soDonHoanThanhTrongNam;
        this.listTongSoDonHoanThanhTheoNamTruoc =
          results.soDonHoanThanhTrongNamTruoc;
        this.listTongSoDonHoanThanhTrongTuan = results.soDonHoanThanhTrongTuan;
        this.listTongSoDonHoanThanhTrongTuanTruoc =
          results.soDonHoanThanhTrongTuanTruoc;
        this.listTongSoDonHoanThanhTheoThang = results.soDonHoanThanhTrongThang;
        this.listTongSoDonHoanThanhTheoThangTruoc =
          results.soDonHoanThanhTrongThangTruoc;
        this.chartLoaded = true;
        this.createChartYear();
      },
      error: (err) => {
        this.chartLoaded = false;
        this.toastSrc.error(`Có lỗi xảy ra: ${err.message.message}`);
      },
    });
  }
}
