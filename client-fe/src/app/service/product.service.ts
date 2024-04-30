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
    pageSize: number = 8,
    search: string = ""
  ): Observable<PagedResponse<SanPham>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&status=1`;
    return this.http.get<PagedResponse<SanPham>>(
      `${this.apiUrl}/client/get-by-page${param}`
    );
  }

  // 2
  public getOneById(id: number): Observable<SanPham> {
    return this.http.get<SanPham>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 3
  public getByFilterForClient(
    pageNumber: number = 1,
    pageSize: number = 8,
    selectedColorIds: number[] = [],
    selectedSizeIds: number[] = [],
    selectedFormIds: number[] = [],
    selectedDesignIds: number[] = [],
    selectedCollarIds: number[] = [],
    selectedSleeveIds: number[] = [],
    selectedMaterialIds: number[] = [],
    minPrice: number = 0,
    maxPrice: number = 0
  ): Observable<PagedResponse<SanPham>> {
    const params = `?pageNumber=${pageNumber}&pageSize=${pageSize}&colorIds=${selectedColorIds}&sizeIds=${selectedSizeIds}&formIds=${selectedFormIds}&designIds=${selectedDesignIds}&collarId=${selectedCollarIds}&sleeveIds=${selectedSleeveIds}&materialIds=${selectedMaterialIds}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    return this.http.get<PagedResponse<SanPham>>(
      `${this.apiUrl}/client/filter${params}`
    );
  }

  // 4
  public getProductByProductDetails(id: number): Observable<SanPham> {
    return this.http.get<SanPham>(
      `${this.apiUrl}/get-by-product-details/${id}`
    );
  }

  // 5
  public getProductNameByProductDetails(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/get-product-name/${id}`, {
      responseType: "text",
    });
  }
}
