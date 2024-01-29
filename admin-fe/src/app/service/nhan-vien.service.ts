import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { NhanVienResponse } from "../model/interface/nhan-vien-response.interface";
import { NhanVien } from "../model/class/nhan-vien.class";

@Injectable({
  providedIn: "root",
})
export class NhanVienService {
  private readonly apiUrl = "http://localhost:8080/nhan-vien";

  constructor(private http: HttpClient) {}

  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<NhanVienResponse>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<NhanVienResponse>>(
      `${this.apiUrl}/get-all${param}`
    );
  }

  public getOneById(id: number): Observable<NhanVienResponse> {
    return this.http.get<NhanVienResponse>(
      `${this.apiUrl}/get-one-by-id/${id}`
    );
  }

  public add(nhanVien: NhanVienResponse): Observable<NhanVienResponse> {
    return this.http.post<NhanVienResponse>(`${this.apiUrl}/add`, nhanVien);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  public update(
    nhanVien: NhanVienResponse,
    id: number
  ): Observable<NhanVienResponse> {
    return this.http.put<NhanVienResponse>(
      `${this.apiUrl}/update/${id}`,
      nhanVien
    );
  }

  public filter(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = "",
    gioiTinhFilter: number[] = [0, 1],
    trangThaiFilter: number[] = [0, 1]
  ): Observable<PagedResponse<NhanVienResponse>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&gioiTinhFilter=${gioiTinhFilter}&trangThaiFilter=${trangThaiFilter}`;
    return this.http.get<PagedResponse<NhanVienResponse>>(
      `${this.apiUrl}/filter${param}`
    );
  }
}
