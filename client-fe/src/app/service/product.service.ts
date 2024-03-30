import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { SanPham } from "../model/class/san-pham.class";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly apiUrl = "http://localhost:8080/san-pham";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getByPageClient(
    pageNumber: number = 1,
    pageSize: number = 8
  ): Observable<PagedResponse<SanPham>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<PagedResponse<SanPham>>(
      `${this.apiUrl}/client/get-by-page${param}`
    );
  }

  // 2
  public getOneById(id: number): Observable<SanPham> {
    return this.http.get<SanPham>(`${this.apiUrl}/get-by-id/${id}`);
  }
}