import { Component } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { ToastrService } from "ngx-toastr";
import { DiscountSummary } from "src/app/model/interface/discount-summary";
import { ChartService } from "src/app/service/chart.service";

@Component({
  selector: "app-pie-discount-chart",
  templateUrl: "./pie-discount-chart.component.html",
  styleUrls: ["./pie-discount-chart.component.css"],
})
export class PieDiscountChartComponent {
  chart: any;
  data: DiscountSummary[] = [];
  backgroundColors: string[] = [];

  constructor(private service: ChartService, private toast: ToastrService) {}
  private getData(): void {
    this.service.getDotGiamGiaTrongNam(2024).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        this.toast.error(error.message.message);
      },
      complete: () => {
        this.backgroundColors = this.data.map(() => {
          return this.generateRandomColor();
        });
        this.createChartCoupon();
      },
    });
  }

  public generateRandomColor(): string {
    var r = Math.floor(Math.random() * 256); // Sinh số ngẫu nhiên cho red (0-255)
    var g = Math.floor(Math.random() * 256); // Sinh số ngẫu nhiên cho green (0-255)
    var b = Math.floor(Math.random() * 256); // Sinh số ngẫu nhiên cho blue (0-255)

    return `rgb(${r}, ${g}, ${b})`; // Trả về chuỗi màu RGB
  }
  public createChartCoupon() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }
    this.chart = new Chart("DiscountChart", {
      type: "pie",
      data: {
        labels: [
          this.data.map((data) => {
            return String(data.maDotGiamGia);
          }),
        ],
        datasets: [
          {
            label: "Số Lượt Sử Dụng",
            data: [
              this.data.map((data) => {
                return Number(data.tongSanPhamDuocBan);
              }),
            ],
            backgroundColor: this.backgroundColors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 0,
      },
    });
  }
  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
