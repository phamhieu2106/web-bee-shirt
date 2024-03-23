import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { NhanVienResponse } from "../model/interface/nhan-vien-response.interface";

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

  public add(
    nhanVien: NhanVienResponse,
    file: File
  ): Observable<NhanVienResponse> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(nhanVien));
    formData.append("khachHangImage", file);
    return this.http.post<NhanVienResponse>(`${this.apiUrl}/add`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  public update(
    nhanVien: NhanVienResponse,
    id: number,
    file: File
  ): Observable<NhanVienResponse> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(nhanVien));
    formData.append("khachHangImage", file);
    return this.http.put<NhanVienResponse>(
      `${this.apiUrl}/update/${id}`,
      formData
    );
  }

  public filter(
    pageNumber: number,
    pageSize: number,
    search: string,
    gioiTinhFilter: number[],
    trangThaiFilter: number[]
  ): Observable<PagedResponse<NhanVienResponse>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&gioiTinhFilter=${gioiTinhFilter}&trangThaiFilter=${trangThaiFilter}`;
    return this.http.get<PagedResponse<NhanVienResponse>>(
      `${this.apiUrl}/filter${param}`
    );
  }
}
