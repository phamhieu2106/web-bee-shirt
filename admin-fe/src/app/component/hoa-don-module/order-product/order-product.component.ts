import { Component, EventEmitter, Input, Output } from "@angular/core";

import { HoaDonChiTiet } from "src/app/model/class/hoa-don-chi-tiet.class";
import { HoaDonChiTietService } from "src/app/service/hoa-don-chi-tiet.service";
import { NotificationService } from "src/app/service/notification.service";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import Swal from "sweetalert2";
import { HoaDonService } from "src/app/service/hoa-don.service";

@Component({
  selector: "app-order-product",
  templateUrl: "./order-product.component.html",
  styleUrls: ["./order-product.component.css"],
})
export class OrderProductComponent {
  @Input({ required: true }) hoaDon: HoaDon;
  @Output() hoaDonChange = new EventEmitter<HoaDon>();
  @Output() getHoaDon = new EventEmitter<number>();

  constructor(
    private hdctService: HoaDonChiTietService,
    private notification: NotificationService,
    private hoaDonService: HoaDonService
  ) {}

  addHDCT(spct: SanPhamChiTiet) {
    this.hdctService.postHoaDonChiTiet(spct.id, this.hoaDon.id).subscribe({
      next: (resp: HoaDonChiTiet) => {
        // console.log(resp);

        this.addOrUpdateHdct(resp);
        this.notification.success("Thêm thành công");
        this.getHoaDon.emit(this.hoaDon.id);
      },
      error: (err) => {
        this.notification.error(err.error.message);
      },
    });
  }

  async addOrUpdateHdct(hdct: HoaDonChiTiet) {
    let check = false;
    for (let i = 0; i < this.hoaDon.hoaDonChiTiets.length; i++) {
      if (this.hoaDon.hoaDonChiTiets[i].id == hdct.id) {
        this.hoaDon.hoaDonChiTiets[i] = hdct;
        check = true;
        break;
      }
    }
    if (!check) {
      this.hoaDon.hoaDonChiTiets.push(hdct);
      Swal.fire({
        title: `Giá của sản phẩm ${hdct.sanPhamChiTiet.sanPham.ten} đã bị thay đổi`,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    }
    this.hoaDon.tongTien = this.hdctService.tinhTongTien(
      this.hoaDon.hoaDonChiTiets
    );
  }

  onPhiVanChuyenChange(value: number) {
    this.hoaDon.phiVanChuyen = value;
    this.hoaDonChange.emit(this.hoaDon);
  }
  plus(hdct: any) {
    let soLuong = hdct.soLuong + 1;
    this.quantityChange(hdct, soLuong);
  }

  minus(hdct: any) {
    if (hdct.soLuong > 1) {
      let soLuong = hdct.soLuong - 1;
      this.quantityChange(hdct, soLuong);
    }
  }
  inputSoLuong(hdct: HoaDonChiTiet, $event: any) {
    let soLuong = $event.target.value;
    this.quantityChange(hdct, soLuong);
  }
  quantityChange(hdct: any, soLuong: number) {
    hdct.soLuong = soLuong;
    this.hdctService.updateHDCT(hdct).subscribe({
      next: (resp) => {
        hdct = resp;
        this.hoaDon.tongTien = this.hdctService.tinhTongTien(
          this.hoaDon.hoaDonChiTiets
        );
        // this.tongTienChange.emit(this.tongTien);
        this.notification.success("Cập nhật thành công");
        setTimeout(() => {
          this.getHoaDon.emit(this.hoaDon.id);
          console.log("getHoaDon");
        }, 50);
      },
      error: (err) => {
        console.log(err);
        this.notification.error(err.error.message);
        // hdct.soLuong = hdct.soLuong - 1;
        hdct.soLuong = soLuong;
      },
    });
  }

  deleteHDCT(id: number) {
    Swal.fire({
      title: "Xác nhận xóa sản phẩm?",
      text: "Bạn chắc chắn muốn xóa sản phẩm ra khỏi đơn hàng ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        this.hdctService.deleteHDCT(id).subscribe({
          next: (resp) => {
            // loại bỏ hdct đã xóa
            this.hoaDon.hoaDonChiTiets = this.hoaDon.hoaDonChiTiets.filter(
              (hdct) => hdct.id !== resp.id
            );
            this.hoaDon.tongTien = this.hdctService.tinhTongTien(
              this.hoaDon.hoaDonChiTiets
            );
            this.notification.success("Xóa thành công");
            setTimeout(() => {
              this.getHoaDon.emit(this.hoaDon.id);
            }, 50);
          },
          error: (err) => {
            console.log(err);
            this.notification.error(err.error.message);
          },
        });
      }
    });
  }

  isGiaoHangAndChuyenKhoan(arg0: HoaDon): boolean {
    return this.hoaDonService.isGiaoHangAndChuyenKhoan(arg0);
  }
}
