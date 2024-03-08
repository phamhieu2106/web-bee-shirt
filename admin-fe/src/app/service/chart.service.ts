import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
    return this.http.get<number[]>(
      `${this.urlAPI}/khach-hang-trong-nam`
    );
  }
  public getSoKhachHangTrongNamTruoc(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.urlAPI}/khach-hang-trong-nam-truoc`
    );
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
}
