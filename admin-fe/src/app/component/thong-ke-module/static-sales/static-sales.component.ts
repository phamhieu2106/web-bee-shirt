import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ChartService } from "src/app/service/chart.service";

@Component({
  selector: "app-static-sales",
  templateUrl: "./static-sales.component.html",
  styleUrls: ["./static-sales.component.css"],
})
export class StaticSalesComponent implements OnInit {
  @Input() doanhThuNamHienTai: number[];
  @Input() doanhThuNamTruoc: number[];

  public phanTramTangTruongDoanhThu: number;
  public tongDoanhThuNamNay: any;
  public tongDoanhThuNamTruoc: any;

  public phanTramTangTruongDonHang: number;
  public tongDonHangNamNay: any;
  public tongDonHangNamTruoc: any;

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.doanhThuNamHienTai.length > 0 && this.doanhThuNamTruoc.length > 0)
      this.returnSalesPercents(this.doanhThuNamHienTai, this.doanhThuNamTruoc);
    this.getPercentDonHang();
  }
  constructor(private service: ChartService, private toastSrc: ToastrService) {}

  private returnSalesPercents(
    doanhThuNamHienTai: number[],
    doanhThuNamTruoc: number[]
  ): void {
    const tongDoanhThuNamHienTai = doanhThuNamHienTai.reduce(
      (total, currentValue) => {
        return total + currentValue;
      }
    );
    const tongDoanhThuNamTruoc = doanhThuNamTruoc.reduce(
      (total, currentValue) => {
        return total + currentValue;
      }
    );

    this.tongDoanhThuNamNay = tongDoanhThuNamHienTai.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    this.tongDoanhThuNamTruoc = tongDoanhThuNamTruoc.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    const phanTramDoanhThu = this.service.returnPercent(
      tongDoanhThuNamHienTai,
      tongDoanhThuNamTruoc
    );

    this.phanTramTangTruongDonHang = this.getPercentDonHang();
    this.phanTramTangTruongDoanhThu = phanTramDoanhThu;
  }

  private getPercentDonHang(): number {
    this.service.getTatCaDonHangTrongNam().subscribe({
      next: (value: number) => {
        this.tongDonHangNamNay = value;
      },
      complete: () => {},
    });
    this.service.getTatCaDonHangTrongNamTruoc().subscribe({
      next: (value: number) => {
        this.tongDonHangNamTruoc = value;
      },
    });
    return this.service.returnPercent(
      this.tongDonHangNamNay,
      this.tongDonHangNamTruoc
    );
  }
}
