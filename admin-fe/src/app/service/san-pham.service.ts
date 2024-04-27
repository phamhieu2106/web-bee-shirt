import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { SanPham } from "../model/class/san-pham.class";
import { ProductDiscountResponse } from "../model/interface/product-discount-response";

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
    search: string = "",
    status: number[] = [0, 1]
  ): Observable<PagedResponse<SanPham>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&status=${status}`;
    return this.http.get<PagedResponse<SanPham>>(
      `${this.apiUrl}/get-by-page${param}`
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
  public changeStatus(id: number, value: boolean): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/status/${id}/${value}`);
  }

  // 5
  public update(sanPham: SanPham): Observable<SanPham> {
    return this.http.put<SanPham>(`${this.apiUrl}/update`, sanPham);
  }

  // 6
  // get List Id San Pham In Active Discount
  public getListIdSanPhamInDiscount(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/checkInDiscount`);
  }
  // 7
  // get List San Pham Chi Tiet In Active Discount
  public getListSanPhamChiTietInDiscount(
    id: number
  ): Observable<ProductDiscountResponse[]> {
    return this.http.get<ProductDiscountResponse[]>(
      `${this.apiUrl}/itemInDiscount?id=${id}`
    );
  }
}
