import { Component } from "@angular/core";
import { Chart, registerables } from "chart.js";

@Component({
  selector: "app-polar-product-chart",
  templateUrl: "./polar-product-chart.component.html",
  styleUrls: ["./polar-product-chart.component.css"],
})
export class PolarProductChartComponent {
  chart: any;
  data = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  public createChartCoupon() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }
    this.chart = new Chart("ProductChart", {
      type: "polarArea",
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
