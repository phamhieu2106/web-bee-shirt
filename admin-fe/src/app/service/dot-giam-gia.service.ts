import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DotGiamGia } from "../model/class/dot-giam-gia.class";
import { PagedResponse } from "../model/interface/paged-response.interface";
import { SanPhamChiTiet } from "../model/class/san-pham-chi-tiet.class";
import { DotGiamGiaSanPhamChiTiet } from "../model/interface/dot-giam-gia-san-pham-chi-tiet";
import { SanPham } from "../model/class/san-pham.class";

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
    endDate: string,
    search: string
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}/filter?status=${status}&startDate=${startDate}&endDate=${endDate}&search=${search}`
    );
  }
  public getDotGiamGiaFilterPageNumber(
    pageSize: number,
    pageNumber: number,
    status: number,
    startDate: string,
    endDate: string,
    search: string
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}/filter?pageSize=${pageSize}&pageNumber=${pageNumber}&status=${status}&startDate=${startDate}&endDate=${endDate}&search=${search}`
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
    pageSize: number,
    pageNumber: number
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}?pageSize=${pageSize}&pageNumber=${pageNumber}`
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

  public getAllSanPham(): Observable<SanPham[]> {
    return this.http.get<SanPham[]>(`${this.apiURL}/sanpham`);
  }

  public getAllSanPhamChiTietById(
    id: Array<number>
  ): Observable<PagedResponse<DotGiamGiaSanPhamChiTiet>> {
    return this.http.get<PagedResponse<DotGiamGiaSanPhamChiTiet>>(
      `${this.apiURL}/sanphamchitiet?id=${id}`
    );
  }
  public getAllSanPhamChiTietUpdateById(
    id: Array<number>,
    idDotGiamGia: number
  ): Observable<PagedResponse<DotGiamGiaSanPhamChiTiet>> {
    return this.http.get<PagedResponse<DotGiamGiaSanPhamChiTiet>>(
      `${this.apiURL}/sanphamchitietupdate?id=${id}&idDotGiamGia=${idDotGiamGia}`
    );
  }

  public getIdSanPhamBySanPhamChiTietId(
    ids: number[]
  ): Observable<Array<number>> {
    return this.http.get<Array<number>>(
      `${this.apiURL}/listidsanpham?ids=${ids}`
    );
  }

  public getIdSanPhamChiTietBySanPhamId(id: number): Observable<Array<number>> {
    return this.http.get<Array<number>>(`${this.apiURL}/sanphamchitiet/${id}`);
  }

  public getAllListIdSanPhamChiTietByIdDotGiamGiaSanPham(
    id: number
  ): Observable<Array<number>> {
    return this.http.get<Array<number>>(
      `${this.apiURL}/dotgiamgiasanpham/${id}`
    );
  }

  public addDotGiamGiaRequest(object: any): Observable<DotGiamGia> {
    console.log(object);
    return this.http.post<DotGiamGia>(this.apiURL, object);
  }

  public updateDotGiamGiaRequest(object: any): Observable<DotGiamGia> {
    console.log(object);
    return this.http.put<DotGiamGia>(`${this.apiURL}/${object.id}`, object);
  }
  public realTimeNameCheck(name: any): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiURL}/namecheckrealtime?name=${name}`
    );
  }
  public deleteDotGiamGiaRequest(id: number): Observable<DotGiamGia> {
    return this.http.delete<DotGiamGia>(`${this.apiURL}/${id}`);
  }
}
