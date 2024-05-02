import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AddSPCTRequest } from "../model/interface/add-spct-request.interface";
import { SanPhamChiTiet } from "../model/class/san-pham-chi-tiet.class";
import { PagedResponse } from "../model/interface/paged-response.interface";
import { UpdateNhanhSPCT } from "../model/interface/update-nhanh-spct.interface";
import { FilterSPCTParams } from "../model/interface/filter-spct-params.interface";
import { UpdateSpctReq } from "../model/interface/update-spct-req.interface";
import { UpdateCommonProperties } from "../model/interface/update-common-properties-req.interface";

@Injectable({
  providedIn: "root",
})
export class SanPhamChiTietService {
  private readonly apiUrl = "http://localhost:8080/spct";

  constructor(private http: HttpClient) {}

  // 1
  public add(request: AddSPCTRequest, files: File[]): Observable<string> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(request));
    if (files) {
      for (let file of files) {
        formData.append("files", file);
      }
    }
    return this.http.post(`${this.apiUrl}/add`, formData, {
      responseType: "text",
    });
  }

  // 2
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

  // 3
  public filterProDetailsByPage(
    params: FilterSPCTParams
  ): Observable<PagedResponse<SanPhamChiTiet>> {
    return this.http.post<PagedResponse<SanPhamChiTiet>>(
      `${this.apiUrl}/filter-by-page`,
      params
    );
  }

  // 4
  public getByPage(spId: number): Observable<PagedResponse<SanPhamChiTiet>> {
    return this.http.get<PagedResponse<SanPhamChiTiet>>(
      `${this.apiUrl}/get-by-page/${spId}`
    );
  }

  // 5
  public getOneById(spctId: number): Observable<SanPhamChiTiet> {
    return this.http.get<SanPhamChiTiet>(`${this.apiUrl}/get-one/${spctId}`);
  }

  // 6
  public getGiaBan(spct: SanPhamChiTiet): number {
    if (spct.dotGiamGia == null) {
      return spct.giaBan;
    } else {
      return (spct.giaBan * (100 - spct.dotGiamGia.giaTriPhanTram)) / 100;
    }
  }

  // 7
  public quickUpdate(updateNhanhReq: UpdateNhanhSPCT): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/quick-update`, updateNhanhReq);
  }

  // 8
  public update(updateSpctReq: UpdateSpctReq): Observable<string> {
    return this.http.post(`${this.apiUrl}/update`, updateSpctReq, {
      responseType: "text",
    });
  }

  // 9
  public getMinAndMaxPrice(productId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/min-max-price/${productId}`);
  }

  // 10
  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}`, {
      responseType: "text",
    });
  }

  // 11
  public getAnySpctBySanPhamId(sanPhamId: number): Observable<SanPhamChiTiet> {
    return this.http.get<SanPhamChiTiet>(
      `${this.apiUrl}/get-any-by-spid/${sanPhamId}`
    );
  }

  // 12
  public checkSpctExists(
    spId: number,
    mauSacId: number,
    sizeId: number
  ): Observable<boolean> {
    const params = `?spId=${spId}&mauSacId=${mauSacId}&sizeId=${sizeId}`;
    return this.http.get<boolean>(`${this.apiUrl}/check-exist${params}`);
  }

  // 13
  public getMinMaxPrice(): Observable<any> {
    return this.http.get<SanPhamChiTiet>(`${this.apiUrl}/min-max-price`);
  }

  // 14
  public updateImages(
    files: File[],
    spId: number,
    mauSacId: number
  ): Observable<string> {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    return this.http.put(
      `${this.apiUrl}/update-images?spId=${spId}&mauSacId=${mauSacId}`,
      formData,
      {
        responseType: "text",
      }
    );
  }

  // 15
  public getAllDetail(
    pageNumber: number,
    search: string,
    mauSac: string,
    kichCo: string,
    kieuDang: string,
    thietKe: string,
    tayAo: string,
    coAo: string,
    chatLieu: string,
    giaMin: number,
    giaMax: number
  ): Observable<PagedResponse<SanPhamChiTiet>> {
    let pageSize = 5;
    const params = `?pageNumber=${pageNumber} &pageSize=${pageSize}&search=${search}&mauSac=${mauSac}&kichCo=${kichCo}&kieuDang=${kieuDang}&thietKe=${thietKe}&tayAo=${tayAo}&coAo=${coAo}&chatLieu=${chatLieu}&giaMin=${giaMin}&giaMax=${giaMax}`;
    return this.http.get<PagedResponse<SanPhamChiTiet>>(
      `${this.apiUrl}/get-all-detail` + params
    );
  }
  public getById(id: number): Observable<SanPhamChiTiet> {
    return this.http.get<SanPhamChiTiet>(`${this.apiUrl}/get-by-id/` + id);
  }

  // 16
  public updateCommonProperties(req: UpdateCommonProperties): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/update-properties`, req);
  }
}
