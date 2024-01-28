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

  public add(khachHang: KhachHangResponse): Observable<KhachHangResponse> {
    return this.http.post<KhachHangResponse>(`${this.apiUrl}/add-kh`, khachHang);
  }

  public getById(id: number): Observable<KhachHangResponse> {
    return this.http.get<KhachHangResponse>(`${this.apiUrl}/getById/${id}`);
  }

  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/delete/${id}`, {
      responseType: "text",
    });
  }

  public update(khachHang: KhachHang): Observable<KhachHang> {
    return this.http.put<KhachHang>(`${this.apiUrl}/update-kh`, khachHang);
  }
}
