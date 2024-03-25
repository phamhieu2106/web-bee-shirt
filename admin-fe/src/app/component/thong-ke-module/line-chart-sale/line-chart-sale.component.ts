import { Component, Input, SimpleChanges } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { ChartService } from "src/app/service/chart.service";

@Component({
  selector: "app-line-chart-sale",
  templateUrl: "./line-chart-sale.component.html",
  styleUrls: ["./line-chart-sale.component.css"],
})
export class LineChartSaleComponent {
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
  listDoanhThuTrongNamHienTai: number[];
  listDoanhThuTrongNamTruoc: number[];

  listDoanhThuTrongThangHienTai: number[];
  listDoanhThuTrongThangTruoc: number[];

  listDoanhThuTrongTuanHientai: number[];
  listDoanhThuTrongTuanTruoc: number[];
  //

  constructor(private service: ChartService, private toastSrc: ToastrService) {}

  ngOnInit(): void {
    this.getMonths();
    this.loadChartDoanhThu();
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
    const dataHienTai = this.listDoanhThuTrongTuanHientai;
    const dataTruoc = this.listDoanhThuTrongTuanTruoc;
    this.chart = new Chart("SaleChart", {
      type: "line",
      data: {
        labels: this.currentDay,

        datasets: [
          {
            label: "Tuần Trước",
            data: dataTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Tuần Hiện Tại",
            data: dataHienTai,
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
              callback: function (value, index, values) {
                if (typeof value === "number") {
                  if (index === values.length - 1) {
                    return "1+ Tỉ VNĐ";
                  } else {
                    let formattedValue =
                      value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                      " Triệu VNĐ";
                    if (value % 1 === 0) {
                      // Kiểm tra xem giá trị có phải là số nguyên không
                      formattedValue = value.toLocaleString() + " VNĐ"; // Sử dụng toLocaleString để loại bỏ số thập phân .00
                    }
                    return formattedValue;
                  }
                } else {
                  return value; // Trả về giá trị nguyên nếu không phải là số
                }
              },
            },
            min: 0,
            max: 1000000000,
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
    const dataHienTai = this.listDoanhThuTrongThangHienTai;
    const dataTruoc = this.listDoanhThuTrongThangTruoc;
    this.chart = new Chart("SaleChart", {
      type: "line",
      data: {
        labels: this.currentWeek,

        datasets: [
          {
            label: "Tháng Trước",
            data: dataTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Tháng Hiện Tại",
            data: dataHienTai,
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
              callback: function (value, index, values) {
                if (typeof value === "number") {
                  if (index === values.length - 1) {
                    return "1+ Tỉ VNĐ";
                  } else {
                    let formattedValue =
                      value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                      " Triệu VNĐ";
                    if (value % 1 === 0) {
                      // Kiểm tra xem giá trị có phải là số nguyên không
                      formattedValue = value.toLocaleString() + " VNĐ"; // Sử dụng toLocaleString để loại bỏ số thập phân .00
                    }
                    return formattedValue;
                  }
                } else {
                  return value; // Trả về giá trị nguyên nếu không phải là số
                }
              },
            },
            min: 0,
            max: 1000000000,
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
    const dataHienTai = this.listDoanhThuTrongNamHienTai;
    const dataTruoc = this.listDoanhThuTrongNamTruoc;
    this.chart = new Chart("SaleChart", {
      type: "line",
      data: {
        labels: this.currentMonth,

        datasets: [
          {
            label: "Năm Trước",
            data: dataTruoc,
            backgroundColor: "blue",
          },
          {
            label: "Năm Hiện Tại",
            data: dataHienTai,
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
              callback: function (value, index, values) {
                if (typeof value === "number") {
                  if (index === values.length - 1) {
                    return "1+ Tỉ VNĐ";
                  } else {
                    let formattedValue =
                      value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                      " Triệu VNĐ";
                    if (value % 1 === 0) {
                      // Kiểm tra xem giá trị có phải là số nguyên không
                      formattedValue = value.toLocaleString() + " VNĐ"; // Sử dụng toLocaleString để loại bỏ số thập phân .00
                    }
                    return formattedValue;
                  }
                } else {
                  return value; // Trả về giá trị nguyên nếu không phải là số
                }
              },
            },
            min: 0,
            max: 1000000000,
          },
        },
      },
    });
  }

  public loadChartDoanhThu(): void {
    forkJoin({
      listDoanhThuTrongNamHienTai: this.service.getDoanhThuTrongNamHienTai(),
      listDoanhThuTrongNamTruoc: this.service.getDoanhThuTrongNamTruoc(),
      listDoanhThuTrongThangHienTai:
        this.service.getDoanhThuTrongThangHienTai(),
      listDoanhThuTrongThangTruoc: this.service.getDoanhThuTrongThangTruoc(),
      listDoanhThuTrongTuanHientai: this.service.getDoanhThuTrongTuanHienTai(),
      listDoanhThuTrongTuanTruoc: this.service.getDoanhThuTrongTuanTruoc(),
    }).subscribe({
      next: (results) => {
        this.listDoanhThuTrongNamHienTai = results.listDoanhThuTrongNamHienTai;
        this.listDoanhThuTrongNamTruoc = results.listDoanhThuTrongNamTruoc;
        this.listDoanhThuTrongThangHienTai =
          results.listDoanhThuTrongThangHienTai;
        this.listDoanhThuTrongThangTruoc = results.listDoanhThuTrongThangTruoc;
        this.listDoanhThuTrongTuanHientai =
          results.listDoanhThuTrongTuanHientai;
        this.listDoanhThuTrongTuanTruoc = results.listDoanhThuTrongTuanTruoc;
        this.createChartYear();
      },
      error: (err) => {
        this.toastSrc.error(`Có lỗi xảy ra: ${err.message}`);
      },
    });
  }
}
