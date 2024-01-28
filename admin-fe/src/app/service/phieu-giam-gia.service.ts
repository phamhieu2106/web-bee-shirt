import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResponse } from "../model/interface/paged-response.interface";
import { PhieuGiamGia } from "../model/class/phieu-giam-gia.class";

@Injectable({
  providedIn: "root",
})
export class PhieuGiamGiaService {
  private readonly apiUrl = "http://localhost:8080/phieu-giam-gia";
  constructor(private http: HttpClient) { }

  //public function

  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<PhieuGiamGia>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<PhieuGiamGia>>(
      `${this.apiUrl}/ds-phieu-giam-gia${param}`
    );
  }

  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}`, {
      responseType: "text",
    });
  }

  public add(phieuGiamGia: PhieuGiamGia): Observable<PhieuGiamGia> {
    return this.http.post<PhieuGiamGia>(`${this.apiUrl}/add`, phieuGiamGia);
  }

  public addPhieuKhachHang(phieuGiamGiaId: number, selectedIds: number[]): Observable<PhieuGiamGia> {
    const request = {
      phieuGiamGiaId,
      selectedIds,
    };
    return this.http.post<PhieuGiamGia>(`${this.apiUrl}/add-phieu`, request);
  }
}
