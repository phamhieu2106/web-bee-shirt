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
}
