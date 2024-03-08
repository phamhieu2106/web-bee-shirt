import { Component, OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements OnInit {
  chart: any;
  data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [3000, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  public createChartCoupon() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }
    this.chart = new Chart("CouponChart", {
      type: "pie",
      data: this.data,
      options: {
        aspectRatio: 0,
      },
    });
  }
  ngOnInit(): void {
    this.createChartCoupon();
  }
}
