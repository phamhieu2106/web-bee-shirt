import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SanPhamChiTiet } from "../model/class/san-pham-chi-tiet.class";
import { HoaDon } from "../model/class/hoa-don.class";
import { HoaDonTraHangRequest } from "../model/class/hoa-don-tra-hang-request";
import { HoaDonTraHang } from "../model/class/hoa-don-tra-hang";
import { HoaDonRequest } from "../model/class/hoa-don-request.class";
import { SanPham } from "../model/class/san-pham.class";

@Injectable({
  providedIn: "root",
})
export class TraHangService {
  private readonly apiUrl = "http://localhost:8080/tra-hang";
  private readonly apiSPUrl = "http://localhost:8080/san-pham";
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

  public handleTraHang(
    idHoaDon: number,
    moTa: string,
    isNext: boolean
  ): Observable<HoaDon> {
    return this.https.post<HoaDon>(`${this.apiUrl}`, {
      idHoaDon,
      moTa,
      isNext,
    });
  }
  public handleTaoHoaDon(
    hoaDonTraHangRequest: HoaDonTraHangRequest
  ): Observable<HoaDonTraHang> {
    return this.https.post<HoaDonTraHang>(
      `${this.apiUrl}/tao-hoa-don-tra-hang`,
      hoaDonTraHangRequest
    );
  }

  public placeOrderTraHang(hoaDonRequest: HoaDonRequest): Observable<HoaDon> {
    return this.https.post<HoaDon>(
      this.apiUrl + "/place-order-tra-hang",
      hoaDonRequest
    );
  }

  public getName(id: number): Observable<SanPham> {
    return this.https.get<SanPham>(`${this.apiSPUrl}/nameItem?id=${id}`);
  }

  public getHoaDonTraHang(id: number): Observable<HoaDonTraHang> {
    return this.https.get<HoaDonTraHang>(
      `${this.apiUrl}/tim-hoa-don-tra-hang?id=${id}`
    );
  }
}
