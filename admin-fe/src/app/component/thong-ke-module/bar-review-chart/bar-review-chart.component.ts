import { Component, Input, OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";

@Component({
  selector: "app-bar-review-chart",
  templateUrl: "./bar-review-chart.component.html",
  styleUrls: ["./bar-review-chart.component.css"],
})
export class BarReviewChartComponent implements OnInit {
  chart: any;
  @Input() tenChart: string;

  public data = {
    labels: ["5 Sao", "4 Sao", "3 Sao", "2 Sao", "1 Sao"],
    datasets: [
      {
        label: "Lượt Đánh Giá Sản Phẩm",
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  ngOnInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
  public createChart() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }
    this.chart = new Chart("ReviewChart", {
      type: "bar",
      data: this.data,
      options: {
        scales: {
          y: {
            max: 100,
            beginAtZero: true,
            ticks: {
              callback: function (value, index, ticks) {
                // Prevent the "+" from being duplicated
                if (
                  value === ticks[ticks.length - 1].value &&
                  index === ticks.length - 1
                ) {
                  return "100+";
                }
                return value;
              },
            },
          },
        },
      },
    });
  }
}
