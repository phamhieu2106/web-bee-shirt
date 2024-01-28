import { Component, Input } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { HoaDonChiTiet } from "src/app/model/class/hoa-don-chi-tiet.class";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { HoaDonChiTietService } from "src/app/service/hoa-don-chi-tiet.service";
import { HoaDonService } from "src/app/service/hoa-don.service";
import { PdfService } from "src/app/service/pdf.service";

@Component({
  selector: "app-order-product",
  templateUrl: "./order-product.component.html",
  styleUrls: ["./order-product.component.css"],
})
export class OrderProductComponent {
  @Input({ required: true }) hoaDon: HoaDon;

  constructor(
    private hdctService: HoaDonChiTietService,
    private toastr: ToastrService,
    private hoaDonService: HoaDonService
  ) {}
  plus(hdct: any) {
    hdct.soLuong = hdct.soLuong + 1;
    this.hdctService.updateHDCT(hdct).subscribe({
      next: (resp) => {
        hdct = resp;
        this.toastr.success("Cập nhật thành công", "");
        this.getHoaDonById();
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
          this.getHoaDonById();
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
        this.getHoaDonById();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Cập nhật thất bại", "");
        hdct.soLuong = hdct.soLuong - 1;
      },
    });
  }

  delete(id: number) {
    this.hdctService.deleteHDCT(id).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.getHoaDonById();
        this.toastr.success(resp.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getHoaDonById() {
    this.hoaDonService.getById(this.hoaDon.id).subscribe({
      next: (resp: HoaDon) => {
        this.hoaDon = resp;
        console.log(resp);
      },
      error: (err) => console.log(err),
    });
  }
}
