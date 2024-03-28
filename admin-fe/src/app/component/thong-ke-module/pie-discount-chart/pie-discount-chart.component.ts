import { Component, Input } from "@angular/core";
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
  chartLoaded = false;
  chart: any;
  data: DiscountSummary[];
  backgroundColors: string[] = [];

  constructor(private service: ChartService, private toast: ToastrService) {}

  @Input() date: any;
  private getData(): void {
    const year = new Date(this.date).getFullYear(); // Lấy năm từ biến date
    this.service.getDotGiamGiaTrongNam(year).subscribe({
      next: (data) => {
        this.data = data;
        this.backgroundColors = this.data.map(() => {
          return this.generateRandomColor();
        });
        this.createChartCoupon();
      },
      error: (error) => {
        this.toast.error(error.message.message);
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

    const label = this.data.map((data) => {
      return String(data.maDotGiamGia);
    });
    const data = this.data.map((data) => {
      return Number(data.tongSanPhamDuocBan);
    });
    this.chart = new Chart("DiscountChart", {
      type: "pie",
      data: {
        labels: label,
        datasets: [
          {
            label: "Sản Phẩm Được Mua",
            data: data,
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
  ngOnChanges() {
    if (this.date) {
      this.getData();
    }
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
