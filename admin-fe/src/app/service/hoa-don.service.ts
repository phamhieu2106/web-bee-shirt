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
}
