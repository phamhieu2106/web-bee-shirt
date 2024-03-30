import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SanPhamChiTiet } from "../model/class/san-pham-chi-tiet.class";
import { HoaDon } from "../model/class/hoa-don.class";
import { PhieuGiamGia } from "../model/class/phieu-giam-gia.class";

@Injectable({
  providedIn: "root",
})
export class TraHangService {
  private readonly apiUrl = "http://localhost:8080/tra-hang";
  constructor(private https: HttpClient) {}

  public getHoaDon(ma: string): Observable<HoaDon> {
    return this.https.get<HoaDon>(`${this.apiUrl}/tim-hoa-don?ma=${ma}`);
  }

  public getAllSanPhamDaMua(idHoaDon: number): Observable<SanPhamChiTiet[]> {
    return this.https.get<SanPhamChiTiet[]>(
      `${this.apiUrl}/danh-sach-san-pham?id=${idHoaDon}`
    );
  }
  public getListIdDotGiamGiaSanPham(idHoaDon: number): Observable<number[]> {
    return this.https.get<number[]>(
      `${this.apiUrl}/dot-giam-gia-san-pham?id=${idHoaDon}`
    );
  }
}
