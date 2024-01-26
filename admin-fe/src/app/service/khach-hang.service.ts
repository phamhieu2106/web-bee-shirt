import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { KhachHang } from "../model/class/KhachHang.class";

@Injectable({
  providedIn: "root",
})
export class KhachHangService {
  private readonly apiUrl = "http://localhost:8080/khach-hang";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<KhachHang>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<KhachHang>>(
      `${this.apiUrl}/get-all${param}`
    );
  }

  // 2
  public add(khachHang: KhachHang): Observable<KhachHang> {
    return this.http.post<KhachHang>(`${this.apiUrl}/add-kh`, khachHang);
  }

  // 3
  public getById(id: number): Observable<KhachHang> {
    return this.http.get<KhachHang>(`${this.apiUrl}/getKH/${id}`);
  }

  // 4
  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/delete/${id}`, {
      responseType: "text",
    });
  }

  // 5
  public update(khachHang: KhachHang): Observable<KhachHang> {
    return this.http.put<KhachHang>(`${this.apiUrl}/update-kh`, khachHang);
  }
}
