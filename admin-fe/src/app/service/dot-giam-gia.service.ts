import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DotGiamGia } from "../model/class/dot-giam-gia.class";
import { PagedResponse } from "../model/interface/paged-response.interface";
import { SanPhamChiTiet } from "../model/class/san-pham-chi-tiet.class";
import { DotGiamGiaSanPhamChiTiet } from "../model/interface/dot-giam-gia-san-pham-chi-tiet";

@Injectable({
  providedIn: "root",
})
export class DotGiamGiaService {
  private readonly apiURL = "http://localhost:8080/dot-giam-gia";
  constructor(private http: HttpClient) {}

  public getAllDotGiamGia(): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(this.apiURL);
  }

  public getDotGiamGiaById(id: number): Observable<DotGiamGia> {
    return this.http.get<DotGiamGia>(`${this.apiURL}/${id}`);
  }

  public getFilterDotGiamGia(
    status: number,
    startDate: string,
    endDate: string
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}/filter?status=${status}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  public getDotGiamGiaSearch(
    search: string
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}?search=${search}`
    );
  }

  public getDotGiamGiaPageSize(
    pageSize: number
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}?pageSize=${pageSize}`
    );
  }

  public getDotGiamGiaPageNumber(
    pageSize: number,
    pageNumber: number
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }

  public getAllSanPhamChiTietById(
    id: Array<number>
  ): Observable<PagedResponse<DotGiamGiaSanPhamChiTiet>> {
    return this.http.get<PagedResponse<DotGiamGiaSanPhamChiTiet>>(
      `${this.apiURL}/sanphamchitiet?id=${id}`
    );
  }

  public getIdSanPhamBySanPhamChiTietId(
    ids: number[]
  ): Observable<Array<number>> {
    return this.http.get<Array<number>>(
      `${this.apiURL}/listidsanpham?ids=${ids}`
    );
  }

  public getAllListIdSanPhamChiTietByIdDotGiamGiaSanPham(
    id: number
  ): Observable<Array<number>> {
    return this.http.get<Array<number>>(
      `${this.apiURL}/dotgiamgiasanpham/${id}`
    );
  }

  public addDotGiamGiaRequest(object: any): Observable<DotGiamGia> {
    return this.http.post<DotGiamGia>(this.apiURL, object);
  }

  public updateDotGiamGiaRequest(object: any): Observable<DotGiamGia> {
    console.log(object);
    return this.http.put<DotGiamGia>(`${this.apiURL}/${object.id}`, object);
  }
  public deleteDotGiamGiaRequest(id: number): Observable<DotGiamGia> {
    return this.http.delete<DotGiamGia>(`${this.apiURL}/${id}`);
  }
}
