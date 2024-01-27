import { Component, Input } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { HoaDonChiTiet } from "src/app/model/class/hoa-don-chi-tiet.class";
import { HoaDonChiTietService } from "src/app/service/hoa-don-chi-tiet.service";


@Component({
  selector: "app-order-product",
  templateUrl: "./order-product.component.html",
  styleUrls: ["./order-product.component.css"],
})
export class OrderProductComponent {
  @Input({ required: true }) hoaDonChiTiets: HoaDonChiTiet[];
  @Input({ required: true }) tongTien: number;
  @Input({ required: true }) tienGiam: number;
  @Input({ required: true }) phiVanChuyen: number;
  @Input({ required: true }) loaiHoaDon: string;

  constructor(
    private hdctService: HoaDonChiTietService,
    private toastr: ToastrService
  ) {}
  plus(hdct: any) {
    hdct.soLuong = hdct.soLuong + 1;
    this.hdctService.updateHDCT(hdct).subscribe({
      next: (resp) => {
        hdct = resp;
        this.toastr.success("Cập nhật thành công", "");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Cập nhật thất bại", "");
        hdct.soLuong = hdct.soLuong - 1;
      },
    });
  }

  minus(hdct: any) {
    if (hdct.soLuong > 1) {
      hdct.soLuong = hdct.soLuong - 1;
      this.hdctService.updateHDCT(hdct).subscribe({
        next: (resp) => {
          hdct = resp;
          this.toastr.success("Cập nhật thành công", "");
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Cập nhật thất bại", "");
          hdct.soLuong = hdct.soLuong + 1;
        },
      });
    }
  }

  quantityChange(hdct: any) {
    this.hdctService.updateHDCT(hdct).subscribe({
      next: (resp) => {
        hdct = resp;
        this.toastr.success("Cập nhật thành công", "");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Cập nhật thất bại", "");
        hdct.soLuong = hdct.soLuong - 1;
      },
    });
  }

}
