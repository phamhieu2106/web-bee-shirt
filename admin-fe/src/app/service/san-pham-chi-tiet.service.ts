import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddSPCTRequest } from "../model/interface/add-spct-request.interface";
import { SanPhamChiTiet } from "../model/class/san-pham-chi-tiet.class";
import { PagedResponse } from "../model/interface/paged-response.interface";

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

  public getByPage(spId: number): Observable<PagedResponse<SanPhamChiTiet>> {
    return this.http.get<PagedResponse<SanPhamChiTiet>>(
      `${this.apiUrl}/get-by-page/${spId}`
    );
  }
}
