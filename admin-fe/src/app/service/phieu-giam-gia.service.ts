import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, interval } from "rxjs";
import { switchMap } from 'rxjs/operators';

import { PagedResponse } from "../model/interface/paged-response.interface";
import { PhieuGiamGia } from "../model/class/phieu-giam-gia.class";
import { PhieuGiamGiaKhachHang } from "../model/class/phieu-giam-gia-khach-hang.class";

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

  public getOne(id: number): Observable<PhieuGiamGia> {
    return this.http.get<PhieuGiamGia>(`${this.apiUrl}/sua-phieu/${id}`);
  }


  public changeStatus(id: number): Observable<PhieuGiamGia> {
    return this.http.put<PhieuGiamGia>(`${this.apiUrl}/status/${id}`, id);
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

  public getAllPhieuKhachHang(): Observable<PhieuGiamGiaKhachHang[]> {
    return this.http.get<PhieuGiamGiaKhachHang[]>(`${this.apiUrl}/get-phieu-khach-hang`);
  }
  public getKhachHangTang(id: number): Observable<PhieuGiamGiaKhachHang[]> {
    return this.http.get<PhieuGiamGiaKhachHang[]>(`${this.apiUrl}/get-phieu-khach-hang/${id}`);
  }

  public getKhachHangTangKhongCo(id: number): Observable<PhieuGiamGiaKhachHang[]> {
    return this.http.get<PhieuGiamGiaKhachHang[]>(`${this.apiUrl}/get-phieu-Khong-co/${id}`);
  }




  getPhieuGiamGiaList(): Observable<PhieuGiamGia[]> {
    return this.http.get<PhieuGiamGia[]>(`${this.apiUrl}/get-all`);
  }

  startPolling(): Observable<PhieuGiamGia[]> {
    return interval(5000)  // Cứ sau mỗi 5 giây, bạn có thể điều chỉnh thời gian
      .pipe(
        switchMap(() => this.getPhieuGiamGiaList())
      );
  }
}
