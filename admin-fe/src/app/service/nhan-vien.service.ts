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
}
