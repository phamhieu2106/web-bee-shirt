import { Component, OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { ToastrService } from "ngx-toastr";
import { CouponsSummary } from "src/app/model/interface/coupons-summary";
import { ChartService } from "src/app/service/chart.service";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements OnInit {
  chart: any;
  data: CouponsSummary[];
  backgroundColors: string[] = [];
  ngOnInit(): void {
    this.getData();
  }
  constructor(private service: ChartService, private toast: ToastrService) {}
  private getData(): void {
    this.service.getPhieGiamGiaDuocSuDungTrongNam(2024).subscribe({
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

  public createChartCoupon() {
    Chart.register(...registerables);
    if (this.chart) {
      this.chart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo mới
    }
    this.chart = new Chart("CouponChart", {
      type: "pie",
      data: {
        labels: [
          this.data.map((data) => {
            return `${String(data.maPhieuGiamGia)} - ${String(
              data.tenPhieuGiamGia
            )}`;
          }),
        ],
        datasets: [
          {
            label: "Số Lượt Sử Dụng",
            data: [
              this.data.map((data) => {
                return Number(data.soLuotSuDung);
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
  public generateRandomColor(): string {
    var r = Math.floor(Math.random() * 256); // Sinh số ngẫu nhiên cho red (0-255)
    var g = Math.floor(Math.random() * 256); // Sinh số ngẫu nhiên cho green (0-255)
    var b = Math.floor(Math.random() * 256); // Sinh số ngẫu nhiên cho blue (0-255)

    return `rgb(${r}, ${g}, ${b})`; // Trả về chuỗi màu RGB
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
