import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
    ngayTao = ""
  ): Observable<any> {
    const params = `/ds-hoa-don?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&loaiHoaDon=${loaiHoaDon}&ngayTao=${ngayTao}`;
    return this.http.get(this.baseUrl + params);
  }

  // get by id
  public getById(id: number): Observable<any> {
    const url = `/get-by-id/${id}`;
    return this.http.get(this.baseUrl + url);
  }

  // change order status
  public changeOrderStatus(
    idHoaDon: number,
    moTa: string,
    isNext: boolean
  ): Observable<any> {
    return this.http.post(this.baseUrl + "/change-status", {
      idHoaDon,
      moTa,
      isNext,
    });
  }

  // cancel order
  public cancelOrder(idHoaDon: number, moTa: string): Observable<any> {
    return this.http.post(this.baseUrl + "/change-status/cancel", {
      idHoaDon,
      moTa,
    });
  }
}
