import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HoaDonChiTietService {
  private readonly baseUrl = "http://localhost:8080/hoa-don-chi-tiet";

  constructor(private http: HttpClient) {}

  updateHDCT(hdct: any): Observable<any> {
    return this.http.put(this.baseUrl + "/update", hdct);
  }

  deleteHDCT(idHDCT: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/delete/" + idHDCT);
  }
}
