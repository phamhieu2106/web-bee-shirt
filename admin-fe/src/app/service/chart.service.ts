import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DiscountSummary } from "../model/interface/discount-summary";
import { ProductSummary } from "../model/interface/product-summary";
import { CouponsSummary } from "../model/interface/coupons-summary";

@Injectable({
  providedIn: "root",
})
export class ChartService {
  private readonly urlAPI: string = "http://localhost:8080/thong-ke";

  constructor(private http: HttpClient) {}

  public getSoDonHoanThanh(): Observable<number> {
    return this.http.get<number>(`${this.urlAPI}/hoa-don-hoan-thanh`);
  }
  public getSoDonMoi(): Observable<number> {
    return this.http.get<number>(`${this.urlAPI}/hoa-don-moi`);
  }
  public getSoDonChoGiao(): Observable<number> {
    return this.http.get<number>(`${this.urlAPI}/hoa-don-cho-giao`);
  }
  public getSoDonHuy(): Observable<number> {
    return this.http.get<number>(`${this.urlAPI}/hoa-don-huy`);
  }
  public getSoDonHoanThanhTrongNam(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/hoa-don-hoan-thanh-trong-nam`
    );
  }
  public getSoDonHoanThanhTrongNamTruoc(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/hoa-don-hoan-thanh-trong-nam-truoc`
    );
  }
  public getSoDonHoanThanhTrongThang(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/hoa-don-hoan-thanh-4-tuan-trong-thang`
    );
  }
  public getSoDonHoanThanhTrongThangTruoc(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/hoa-don-hoan-thanh-4-tuan-trong-thang-truoc`
    );
  }
  public getSoDonHoanThanhTrongTuan(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/hoa-don-hoan-thanh-7-ngay-trong-tuan`
    );
  }
  public getSoDonHoanThanhTrongTuanTruoc(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/hoa-don-hoan-thanh-7-ngay-trong-tuan-truoc`
    );
  }
  public getSoKhachHangTrongNam(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlAPI}/khach-hang-trong-nam`);
  }
  public getSoKhachHangTrongNamTruoc(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlAPI}/khach-hang-trong-nam-truoc`);
  }
  public getSoKhachHangTrongThang(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/khach-hang-4-tuan-trong-thang`
    );
  }
  public getSoKhachHangTrongThangTruoc(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/khach-hang-4-tuan-trong-thang-truoc`
    );
  }
  public getSoKhachHangTrongTuan(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/khach-hang-7-ngay-trong-tuan`
    );
  }
  public getSoKhachHangTrongTuanTruoc(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/khach-hang-7-ngay-trong-tuan-truoc`
    );
  }

  public getDoanhThuTrongNamHienTai(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlAPI}/doanh-thu-nam-hien-tai`);
  }
  public getDoanhThuTrongNamTruoc(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlAPI}/doanh-thu-nam-truoc`);
  }
  public getDoanhThuTrongThangHienTai(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlAPI}/doanh-thu-thang-hien-tai`);
  }
  public getDoanhThuTrongThangTruoc(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlAPI}/doanh-thu-thang-truoc`);
  }
  public getDoanhThuTrongTuanHienTai(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlAPI}/doanh-thu-tuan-hien-tai`);
  }
  public getDoanhThuTrongTuanTruoc(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlAPI}/doanh-thu-tuan-truoc`);
  }
  public getDotGiamGiaTrongNam(year: number): Observable<DiscountSummary[]> {
    if (year === undefined) {
      year = null;
    }
    return this.http.get<DiscountSummary[]>(
      `${this.urlAPI}/san-pham-chi-tiet-dot-giam-gia-trong-nam-bat-ki?year=${year}`
    );
  }

  public getLoaiSanPhamBanChayTrongNam(
    year: number
  ): Observable<ProductSummary[]> {
    if (year === undefined) {
      year = null;
    }
    return this.http.get<ProductSummary[]>(
      `${this.urlAPI}/san-pham-ban-chay-nam-bat-ki?year=${year}`
    );
  }

  public getPhieGiamGiaDuocSuDungTrongNam(
    year: number
  ): Observable<CouponsSummary[]> {
    if (year === undefined) {
      year = null;
    }
    return this.http.get<CouponsSummary[]>(
      `${this.urlAPI}/phieu-giam-gia-su-dung-trong-nam-bat-ki?year=${year}`
    );
  }

  public getTatCaDonHangTrongNam(): Observable<number> {
    return this.http.get<number>(`${this.urlAPI}/lay-tat-ca-hoa-don-trong-nam`);
  }
  public getTatCaDonHangTrongNamTruoc(): Observable<number> {
    return this.http.get<number>(
      `${this.urlAPI}/lay-tat-ca-hoa-don-trong-nam-truoc`
    );
  }
  public returnPercent(firstNumber: number, secondNumber: number): number {
    if (secondNumber == 0) {
      return 100;
    }
    const growthPercentage =
      ((firstNumber - secondNumber) / secondNumber) * 100;

    return growthPercentage;
  }
}
