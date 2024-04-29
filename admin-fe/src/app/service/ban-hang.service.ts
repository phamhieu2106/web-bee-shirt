import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { HoaDon } from "../model/class/hoa-don.class";
import { HoaDonChiTiet } from "../model/class/hoa-don-chi-tiet.class";
import { DiscountValid } from "../model/class/discount-valid.class";

@Injectable({
  providedIn: "root",
})
export class BanHangService {
  private readonly baseUrl = "http://localhost:8080/phieu-giam-gia";
  constructor(private http: HttpClient) {}

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

  getDiscountValid(
    giaTriDonHang: number,
    khachHangId: number,
    giaDangGiam: number
  ): Observable<DiscountValid> {
    let rawData = {
      giaTriDonHang,
      khachHangId,
      giaDangGiam,
    };

    return this.http.post<DiscountValid>(
      this.baseUrl + "/get-discount-valid",
      rawData
    );
  }
}
