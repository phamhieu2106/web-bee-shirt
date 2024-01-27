import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResponse } from "../model/interface/paged-response.interface";
import { HoaDon } from "../model/class/hoa-don.class";
import { LichSuHoaDon } from "../model/class/lich-su-hoa-don.class";

@Injectable({
  providedIn: "root",
})
export class HoaDonService {
  private readonly baseUrl = "http://localhost:8080/hoa-don";
  constructor(private http: HttpClient) {}

  // get all
  public getAll(
    pageNumber: number = 0,
    pageSize: number = 5,
    search: string = "",
    loaiHoaDon = "",
    ngayTao = "",
    trangThai = ""
  ): Observable<PagedResponse<HoaDon>> {
    const params = `/ds-hoa-don?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&loaiHoaDon=${loaiHoaDon}&ngayTao=${ngayTao}&trangThai=${trangThai}`;
    // console.log(this.baseUrl + params);

    return this.http.get<PagedResponse<HoaDon>>(this.baseUrl + params);
  }

  // get by id
  public getById(id: number): Observable<HoaDon> {
    const url = `/get-by-id/${id}`;
    return this.http.get<HoaDon>(this.baseUrl + url);
  }

  // change order status
  public changeOrderStatus(
    idHoaDon: number,
    moTa: string,
    isNext: boolean
  ): Observable<LichSuHoaDon> {
    return this.http.post<LichSuHoaDon>(this.baseUrl + "/change-status", {
      idHoaDon,
      moTa,
      isNext,
    });
  }

  // cancel order
  public cancelOrder(idHoaDon: number, moTa: string): Observable<LichSuHoaDon> {
    return this.http.post<LichSuHoaDon>(
      this.baseUrl + "/change-status/cancel",
      {
        idHoaDon,
        moTa,
      }
    );
  }
}
