import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ThanhToan } from "../model/class/thanh-toan";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThanhToanService {
  private readonly baseUrl = "http://localhost:8080/thanh-toan";

  constructor(private http: HttpClient) {}

  postThanhToan(thanhToan: any, idHoaDon: number): Observable<ThanhToan> {
    console.log(thanhToan);
    return this.http.post<ThanhToan>(this.baseUrl + "/add", {
      idHoaDon: idHoaDon,
      hinhThucThanhToan: thanhToan.hinhThucThanhToan,
      moTa: thanhToan.moTa,
      maGiaoDich: thanhToan.maGiaoDich,
      soTien: thanhToan.tienKhachDua,
    });
  }

  deleteThanhToan(id: number): Observable<ThanhToan> {
    let params = "?id=" + id;
    return this.http.delete<ThanhToan>(this.baseUrl + params);
  }
}
