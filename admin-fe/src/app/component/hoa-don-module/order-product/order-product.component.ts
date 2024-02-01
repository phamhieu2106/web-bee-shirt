import { Component, EventEmitter, Input, Output } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { HoaDonChiTiet } from "src/app/model/class/hoa-don-chi-tiet.class";
import { HoaDonChiTietService } from "src/app/service/hoa-don-chi-tiet.service";

@Component({
  selector: "app-order-product",
  templateUrl: "./order-product.component.html",
  styleUrls: ["./order-product.component.css"],
})
export class OrderProductComponent {
  @Input({ required: true }) idHoaDon: number;
  @Input({ required: true }) loaiHoaDon: string;
  @Input({ required: true }) hoaDonChiTiets: HoaDonChiTiet[];
  @Input({ required: true }) tongTien: number;
  @Input({ required: true }) tienGiam: number;
  @Input({ required: true }) phiVanChuyen: number;

  @Output() tongTienChange = new EventEmitter<number>();
  @Output() tienGiamChange = new EventEmitter<number>();
  @Output() phiVanChuyenChange = new EventEmitter<number>();

  constructor(
    private hdctService: HoaDonChiTietService,
    private toastr: ToastrService
  ) {}

  onPhiVanChuyenChange() {
    this.phiVanChuyenChange.emit(this.phiVanChuyen);
  }
  plus(hdct: any) {
    hdct.soLuong = hdct.soLuong + 1;
    this.quantityChange(hdct);
  }

  minus(hdct: any) {
    if (hdct.soLuong > 1) {
      hdct.soLuong = hdct.soLuong - 1;
      this.quantityChange(hdct);
    }
  }

  quantityChange(hdct: any) {
    this.hdctService.updateHDCT(hdct).subscribe({
      next: (resp) => {
        hdct = resp;
        this.tongTien = this.hdctService.tinhTongTien(this.hoaDonChiTiets);
        this.tongTienChange.emit(this.tongTien);
        this.toastr.success("Cập nhật thành công", "Thành công");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Cập nhật thất bại", "Thất bại");
        hdct.soLuong = hdct.soLuong - 1;
      },
    });
  }

  delete(id: number) {
    this.hdctService.deleteHDCT(id).subscribe({
      next: (resp) => {
        // loại bỏ hdct đã xóa
        this.hoaDonChiTiets = this.hoaDonChiTiets.filter(
          (hdct) => hdct.id !== resp.id
        );
        // tính lại tổng tiền
        this.tongTien = this.hdctService.tinhTongTien(this.hoaDonChiTiets);
        this.tongTienChange.emit(this.tongTien);
        this.toastr.success("Xóa thành công", "Thành công");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Thất bại");
      },
    });
  }
}
