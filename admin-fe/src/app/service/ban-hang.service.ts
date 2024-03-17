import { Injectable } from "@angular/core";
import { HoaDon } from "../model/class/hoa-don.class";
import { HoaDonChiTiet } from "../model/class/hoa-don-chi-tiet.class";

@Injectable({
  providedIn: "root",
})
export class BanHangService {
  constructor() {}

  getTongTien(hoaDonChiTiets: HoaDonChiTiet[]): number {
    let totalPrice = 0;
    hoaDonChiTiets.forEach(
      (hdct) => (totalPrice += hdct.soLuong * hdct.giaBan)
    );
    return totalPrice;
  }

  getSoLuongSanPham(hoaDonChiTiets: HoaDonChiTiet[]): number {
    let soLuong = 0;
    hoaDonChiTiets.forEach((hdct) => (soLuong += hdct.soLuong));
    return soLuong;
  }

  getMustPay(hoaDon: HoaDon): number {
    if (hoaDon != null || hoaDon != undefined) {
      let total = 0;
      total =
        this.getTongTien(hoaDon.hoaDonChiTiets) -
        hoaDon.tienGiam +
        hoaDon.phiVanChuyen;
      return total;
    }
    return 0;
  }
}
