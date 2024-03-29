import { Component, Input } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { ToastrService } from "ngx-toastr";
import { ProductSummary } from "src/app/model/interface/product-summary";
import { ChartService } from "src/app/service/chart.service";

@Component({
  selector: "app-polar-product-chart",
  templateUrl: "./polar-product-chart.component.html",
  styleUrls: ["./polar-product-chart.component.css"],
})
export class PolarProductChartComponent {
  chartLoaded = false;
  chart: any;
  data: ProductSummary[];

  constructor(private service: ChartService, private toast: ToastrService) {}
  @Input() date: any;
  private getData(): void {
    const year = new Date(this.date).getFullYear(); // Lấy năm từ biến date
    this.service.getLoaiSanPhamBanChayTrongNam(year).subscribe({
      next: (data) => {
        this.data = data;
        this.createChartCoupon();
      },
      error: (error) => {
        this.toast.error(error.message.message);
      },
    });
  }

  public createChartCoupon() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }

    const labels = this.data.map(
      (data) => `${data.maSanPham} - ${data.tenSanPham}`
    );
    const dataValues = this.data.map((data) => Number(data.soLuongMua));

    // Assuming you want a unique color for each data point
    const backgroundColors = dataValues.map(() => {
      // Generate a random color for each data point
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r}, ${g}, ${b})`;
    });

    this.chart = new Chart("ProductChart", {
      type: "polarArea",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Lượt Mua",
            data: dataValues,
            backgroundColor: backgroundColors,
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
