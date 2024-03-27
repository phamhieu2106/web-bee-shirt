import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HoaDonChiTiet } from "../model/class/hoa-don-chi-tiet.class";
import { ht } from "date-fns/locale";

@Injectable({
  providedIn: "root",
})
export class HoaDonChiTietService {
  private readonly baseUrl = "http://localhost:8080/hoa-don-chi-tiet";

  constructor(private http: HttpClient) {}
  // Tính tổng tiền
  tinhTongTien(hdcts: HoaDonChiTiet[]): number {
    return hdcts
      .map((hdct) => {
        return hdct.giaBan * hdct.soLuong;
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
  }

  updateHDCT(hdct: HoaDonChiTiet): Observable<HoaDonChiTiet> {
    return this.http.put<HoaDonChiTiet>(this.baseUrl + "/update", hdct);
  }

  deleteHDCT(idHDCT: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/delete/" + idHDCT);
  }

  postHoaDonChiTiet(
    sanPhamChiTietId: number,
    hoaDonId: number
  ): Observable<HoaDonChiTiet> {
    let rawData = { sanPhamChiTietId, hoaDonId };
    return this.http.post<HoaDonChiTiet>(this.baseUrl + "/add", rawData);
  }
}
