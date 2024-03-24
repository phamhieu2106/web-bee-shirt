import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { ChartService } from "src/app/service/chart.service";

@Component({
  selector: "app-line-chart-customer",
  templateUrl: "./line-chart-customer.component.html",
  styleUrls: ["./line-chart-customer.component.css"],
})
export class LineChartCustomerComponent implements OnInit {
  public chartLoad: boolean = false;
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

  listTongSoKhachHangTheoNam: number[];
  listTongSoKhachHangTheoNamTruoc: number[];

  listTongSoKhachHangTheoThang: number[];
  listTongSoKhachHangTheoThangTruoc: number[];

  listTongSoKhachHangTrongTuan: number[];
  listTongSoKhachHangTrongTuanTruoc: number[];

  constructor(private service: ChartService, private toastSrc: ToastrService) {}

  ngOnInit(): void {
    // this.getMonths();
    // this.createChartYear();
    this.getMonths();
    this.loadChartKhachHangHoanThanh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["tenChart"] && !changes["tenChart"].firstChange) {
      // Gọi phương thức tạo biểu đồ tương ứng khi giá trị tenChart thay đổi
      this.switchChart(this.tenChart);
    }
  }

  ngOnDestroy(): void {
    // Hủy bỏ biểu đồ khi component bị hủy
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
    this.chart = new Chart("CustomerChart", {
      type: "line",
      data: {
        labels: this.currentDay,

        datasets: [
          {
            label: "Tuần Trước",
            data: this.listTongSoKhachHangTrongTuanTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Tuần Hiện Tại",
            data: this.listTongSoKhachHangTrongTuan,
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
                  return value + "+ Khách Hàng"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Khách Hàng"; // Giữ nguyên các giá trị khác
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
    this.chart = new Chart("CustomerChart", {
      type: "line",
      data: {
        labels: this.currentWeek,

        datasets: [
          {
            label: "Tháng Trước",
            data: this.listTongSoKhachHangTheoThangTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Tháng Hiện Tại",
            data: this.listTongSoKhachHangTheoThang,
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
                  return value + "+ Khách Hàng"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Khách Hàng"; // Giữ nguyên các giá trị khác
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
    this.chart = new Chart("CustomerChart", {
      type: "line",
      data: {
        labels: this.currentMonth,

        datasets: [
          {
            label: "Năm Trước",
            data: this.listTongSoKhachHangTheoNamTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Năm Hiện Tại",
            data: this.listTongSoKhachHangTheoNam,
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
                  return value + "+ Khách Hàng"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Khách Hàng"; // Giữ nguyên các giá trị khác
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
      listTongSoKhachHangTheoNam: this.service.getSoKhachHangTrongNam(),
      listTongSoKhachHangTheoNamTruoc:
        this.service.getSoKhachHangTrongNamTruoc(),
      listTongSoKhachHangTheoThang: this.service.getSoKhachHangTrongThang(),
      listTongSoKhachHangTheoThangTruoc:
        this.service.getSoKhachHangTrongThangTruoc(),
      listTongSoKhachHangTrongTuan: this.service.getSoKhachHangTrongTuan(),
      listTongSoKhachHangTrongTuanTruoc:
        this.service.getSoKhachHangTrongTuanTruoc(),
    }).subscribe({
      next: (results) => {
        this.listTongSoKhachHangTheoNam = results.listTongSoKhachHangTheoNam;
        this.listTongSoKhachHangTheoNamTruoc =
          results.listTongSoKhachHangTheoNamTruoc;
        this.listTongSoKhachHangTheoThang =
          results.listTongSoKhachHangTheoThang;
        this.listTongSoKhachHangTheoThangTruoc =
          results.listTongSoKhachHangTheoThangTruoc;
        this.listTongSoKhachHangTrongTuan =
          results.listTongSoKhachHangTrongTuan;
        this.listTongSoKhachHangTrongTuanTruoc =
          results.listTongSoKhachHangTrongTuanTruoc;
        this.chartLoad = true;
        this.createChartYear();
      },
      error: (err) => {
        this.chartLoad = false;
        this.toastSrc.error(`Có lỗi xảy ra: ${err.message.message}`);
      },
    });
  }
  public loadChartKhachHangHoanThanh(): void {
    let requestsCompleted = 0;

    const handleCompletion = () => {
      requestsCompleted++;
      if (requestsCompleted === 6) {
        this.createChartDay();
        this.createChartWeek();
        this.createChartYear();
        this.chartLoad = true;
      }
    };

    this.service.getSoKhachHangTrongNamTruoc().subscribe({
      next: (res: any) => {
        this.listTongSoKhachHangTheoNamTruoc = res;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số khách hàng theo năm trước do ${err.message.message}`
        );
        console.log(err);
      },
      complete: handleCompletion,
    });

    this.service.getSoKhachHangTrongNam().subscribe({
      next: (res: any) => {
        this.listTongSoKhachHangTheoNam = res;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số khách hàng theo năm do ${err.message.message}`
        );
        console.log(err);
      },
      complete: handleCompletion,
    });

    this.service.getSoKhachHangTrongTuan().subscribe({
      next: (res: any) => {
        this.listTongSoKhachHangTrongTuan = res;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số khách hàng theo tuần do ${err.message.message}`
        );
        console.log(err);
      },
      complete: handleCompletion,
    });

    this.service.getSoKhachHangTrongTuanTruoc().subscribe({
      next: (res: any) => {
        this.listTongSoKhachHangTrongTuanTruoc = res;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số khách hàng theo tuần trước do ${err.message.message}`
        );
        console.log(err);
      },
      complete: handleCompletion,
    });

    this.service.getSoKhachHangTrongThang().subscribe({
      next: (res: any) => {
        this.listTongSoKhachHangTheoThang = res;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số khách hàng theo tháng do ${err.message.message}`
        );
        console.log(err);
      },
      complete: handleCompletion,
    });
    this.service.getSoKhachHangTrongThangTruoc().subscribe({
      next: (res: any) => {
        this.listTongSoKhachHangTheoThangTruoc = res;
      },
      error: (err) => {
        this.toastSrc.error(
          `Có Lỗi khi cố gắng lấy tổng số khách hàng theo tháng trước do ${err.message.message}`
        );
        console.log(err);
      },
      complete: handleCompletion,
    });
  }
}
