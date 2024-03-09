import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { KieuThietKe } from "../model/class/kieu-thiet-ke.class";

@Injectable({
  providedIn: "root",
})
export class KieuThietKeService {
  private readonly apiUrl = "http://localhost:8080/thiet-ke";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getByPage(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<KieuThietKe>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<KieuThietKe>>(
      `${this.apiUrl}/get-by-page${param}`
    );
  }

  public getAll(): Observable<KieuThietKe[]> {
    return this.http.get<KieuThietKe[]>(`${this.apiUrl}/get-all`);
  }

  public getAllActive(): Observable<KieuThietKe[]> {
    return this.http.get<KieuThietKe[]>(`${this.apiUrl}/all-active`);
  }

  // 2
  public add(chatLieu: KieuThietKe): Observable<KieuThietKe> {
    return this.http.post<KieuThietKe>(`${this.apiUrl}/add`, chatLieu);
  }

  // 3
  public getById(id: number): Observable<KieuThietKe> {
    return this.http.get<KieuThietKe>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 4
  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}`, {
      responseType: "text",
    });
  }

  // 5
  public update(chatLieu: KieuThietKe): Observable<KieuThietKe> {
    return this.http.put<KieuThietKe>(`${this.apiUrl}/update`, chatLieu);
  }
}
