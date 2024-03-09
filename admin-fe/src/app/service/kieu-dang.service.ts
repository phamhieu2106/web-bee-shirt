import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { KieuDang } from "../model/class/kieu-dang.class";

@Injectable({
  providedIn: "root",
})
export class KieuDangService {
  private readonly apiUrl = "http://localhost:8080/kieu-dang";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getByPage(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<KieuDang>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<KieuDang>>(
      `${this.apiUrl}/get-by-page${param}`
    );
  }

  public getAll(): Observable<KieuDang[]> {
    return this.http.get<KieuDang[]>(`${this.apiUrl}/get-all`);
  }

  public getAllActive(): Observable<KieuDang[]> {
    return this.http.get<KieuDang[]>(`${this.apiUrl}/all-active`);
  }

  // 2
  public add(coAo: KieuDang): Observable<KieuDang> {
    return this.http.post<KieuDang>(`${this.apiUrl}/add`, coAo);
  }

  // 3
  public getById(id: number): Observable<KieuDang> {
    return this.http.get<KieuDang>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 4
  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}`, {
      responseType: "text",
    });
  }

  // 5
  public update(chatLieu: KieuDang): Observable<KieuDang> {
    return this.http.put<KieuDang>(`${this.apiUrl}/update`, chatLieu);
  }
}
