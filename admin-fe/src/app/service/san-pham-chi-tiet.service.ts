import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AddSPCTRequest } from "../model/interface/add-spct-request.interface";
import { SanPhamChiTiet } from "../model/class/san-pham-chi-tiet.class";
import { PagedResponse } from "../model/interface/paged-response.interface";
import { UpdateNhanhSPCT } from "../model/interface/update-nhanh-spct.interface";
import { FilterSPCTParams } from "../model/interface/filter-spct-params.interface";
import { UpdateSpctReq } from "../model/interface/update-spct-req.interface";

@Injectable({
  providedIn: "root",
})
export class SanPhamChiTietService {
  private readonly apiUrl = "http://localhost:8080/spct";
  constructor(private http: HttpClient) {}

  public add(request: AddSPCTRequest, files: File[]): Observable<string> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(request));
    for (let file of files) {
      formData.append("files", file);
    }
    return this.http.post(`${this.apiUrl}/add`, formData, {
      responseType: "text",
    });
  }

  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<SanPhamChiTiet>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<SanPhamChiTiet>>(
      `${this.apiUrl}/get-all${param}`
    );
  }

  public filterSPCTByPage(
    params: FilterSPCTParams
  ): Observable<PagedResponse<SanPhamChiTiet>> {
    return this.http.post<PagedResponse<SanPhamChiTiet>>(
      `${this.apiUrl}/filter-by-page`,
      params
    );
  }

  public getByPage(spId: number): Observable<PagedResponse<SanPhamChiTiet>> {
    return this.http.get<PagedResponse<SanPhamChiTiet>>(
      `${this.apiUrl}/get-by-page/${spId}`
    );
  }

  public getOneById(spctId: number): Observable<SanPhamChiTiet> {
    return this.http.get<SanPhamChiTiet>(`${this.apiUrl}/get-one/${spctId}`);
  }

  public getGiaBan(spct: SanPhamChiTiet): number {
    if (spct.dotGiamGiaSanPham == null) {
      return spct.giaBan;
    } else {
      return (spct.giaBan * (100 - spct.dotGiamGiaSanPham.giamGia)) / 100;
    }
  }

  public updateNhanh(updateNhanhReq: UpdateNhanhSPCT): Observable<string> {
    return this.http.post(`${this.apiUrl}/quick-update`, updateNhanhReq, {
      responseType: "text",
    });
  }

  public update(updateSpctReq: UpdateSpctReq): Observable<string> {
    return this.http.post(`${this.apiUrl}/update`, updateSpctReq, {
      responseType: "text",
    });
  }

  public getMinAndMaxPrice(productId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/min-max-price/${productId}`);
  }

  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}`, {
      responseType: "text",
    });
  }
}
