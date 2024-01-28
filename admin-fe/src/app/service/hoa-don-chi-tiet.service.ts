import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HoaDonChiTiet } from "../model/class/hoa-don-chi-tiet.class";

@Injectable({
  providedIn: "root",
})
export class HoaDonChiTietService {
  private readonly baseUrl = "http://localhost:8080/hoa-don-chi-tiet";

  constructor(private http: HttpClient) {}

  updateHDCT(hdct: HoaDonChiTiet): Observable<HoaDonChiTiet> {
    return this.http.put<HoaDonChiTiet>(this.baseUrl + "/update", hdct);
  }

  deleteHDCT(idHDCT: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/delete/" + idHDCT);
  }
}
