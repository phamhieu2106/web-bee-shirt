import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { SanPham } from "../model/class/san-pham.class";

@Injectable({
  providedIn: "root",
})
export class SanPhamService {
  private readonly apiUrl = "http://localhost:8080/san-pham";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getByPage(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<SanPham>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<SanPham>>(
      `${this.apiUrl}/get-all${param}`
    );
  }

  // 2
  public add(chatLieu: SanPham): Observable<SanPham> {
    return this.http.post<SanPham>(`${this.apiUrl}/add`, chatLieu);
  }

  // 3
  public getById(id: number): Observable<SanPham> {
    return this.http.get<SanPham>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 4
  public changeStatus(id: number, value: boolean): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}/${value}`, {
      responseType: "text",
    });
  }

  // 5
  public update(sanPham: SanPham): Observable<SanPham> {
    return this.http.put<SanPham>(`${this.apiUrl}/update`, sanPham);
  }
}
