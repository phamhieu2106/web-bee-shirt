import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { KhachHang } from "../model/class/KhachHang.class";
import { KhachHangResponse } from "../model/interface/khach-hang-response.interface";

@Injectable({
  providedIn: "root",
})
export class KhachHangService {
  private readonly apiUrl = "http://localhost:8080/khach-hang";

  constructor(private http: HttpClient) {}

  public getAll(
    pageNumber: number = 1, 
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<KhachHangResponse>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<KhachHangResponse>>(
      `${this.apiUrl}/get-all${param}`
    );
  }

  public add(khachHang: KhachHangResponse,file: File): Observable<KhachHangResponse> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(khachHang));
    formData.append("khachHangImage", file);
    return this.http.post<KhachHangResponse>(`${this.apiUrl}/add-kh`, formData);
  }

  public getById(id: number): Observable<KhachHangResponse> {
    return this.http.get<KhachHangResponse>(`${this.apiUrl}/getById/${id}`);
  }

  public update(id:number,khachHang: KhachHang,file: File): Observable<KhachHang> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(khachHang));
    formData.append("khachHangImage", file);
    return this.http.put<KhachHang>(`${this.apiUrl}/update-kh/${id}`, formData);
  }

  public filter(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = "",
    gioiTinhFilter: number[] = [0, 1],
    trangThaiFilter: number[] = [0, 1]
  ): Observable<PagedResponse<KhachHangResponse>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&gioiTinhFilter=${gioiTinhFilter}&trangThaiFilter=${trangThaiFilter}`;
    return this.http.get<PagedResponse<KhachHangResponse>>(
      `${this.apiUrl}/filter${param}`
    );
  }
}
