import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Chart, registerables } from "chart.js";

@Component({
  selector: "app-line-chart-customer",
  templateUrl: "./line-chart-customer.component.html",
  styleUrls: ["./line-chart-customer.component.css"],
})
export class LineChartCustomerComponent implements OnInit {
  flashInterval: any;
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

  constructor() {}

  ngOnInit(): void {
    // this.getMonths();
    // this.createChartYear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["tenChart"] && !changes["tenChart"].firstChange) {
      // Gọi phương thức tạo biểu đồ tương ứng khi giá trị tenChart thay đổi
      this.switchChart(this.tenChart);
      clearInterval(this.flashInterval);
      if (this.tenChart == "year") {
        let flashIndex = 11; // về sau sẽ chỉnh flashIndex = với thời điểm  hiện tại
        this.flashInterval = setInterval(() => {
          const dataset = this.chart.data.datasets[1];
          dataset.backgroundColor[flashIndex] =
            dataset.backgroundColor[flashIndex] === "limegreen"
              ? "red"
              : "limegreen";
          this.chart.update();
        }, 1000);
      } else if (this.tenChart == "month") {
        let flashIndex = 3; // về sau sẽ chỉnh flashIndex = với thời điểm  hiện tại
        this.flashInterval = setInterval(() => {
          const dataset = this.chart.data.datasets[1];
          dataset.backgroundColor[flashIndex] =
            dataset.backgroundColor[flashIndex] === "limegreen"
              ? "red"
              : "limegreen";
          this.chart.update();
        }, 1000);
      } else if (this.tenChart == "week") {
        let flashIndex = 6; // về sau sẽ chỉnh flashIndex = với thời điểm  hiện tại
        this.flashInterval = setInterval(() => {
          const dataset = this.chart.data.datasets[1];
          dataset.backgroundColor[flashIndex] =
            dataset.backgroundColor[flashIndex] === "limegreen"
              ? "red"
              : "limegreen";
          this.chart.update();
        }, 1000);
      }
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
            data: [467, 576, 572, 79, 95, 23, 23],
            backgroundColor: "blue",
          },
          {
            label: "Tuần Hiện Tại",
            data: [542, 542, 536, 327, 333, 444, 222],
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
                  return value + "+ Khách hàng"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Khách hàng"; // Giữ nguyên các giá trị khác
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
            data: [467, 576, 572, 79],
            backgroundColor: "blue",
          },
          {
            label: "Tháng Hiện Tại",
            data: [542, 542, 536, 327],
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
                  return value + "+ Khách hàng"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Khách hàng"; // Giữ nguyên các giá trị khác
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
            data: [467, 576, 572, 79, 92, 574, 573, 576, 576, 576, 576, 576],
            backgroundColor: "blue",
          },
          {
            label: "Năm Hiện Tại",
            data: [542, 542, 536, 327, 17, 0.0, 538, 541, 541, 541, 541, 541],
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
                  return value + "+ Khách hàng"; // Thêm dấu "+" vào giá trị cuối cùng
                } else {
                  return value + " Khách hàng"; // Giữ nguyên các giá trị khác
                }
              },
            },
          },
        },
      },
    });
  }
}
