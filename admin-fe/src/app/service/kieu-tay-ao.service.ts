import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { TayAo } from "../model/class/tay-ao.class";

@Injectable({
  providedIn: "root",
})
export class KieuTayAoService {
  private readonly apiUrl = "http://localhost:8080/tay-ao";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getByPage(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<TayAo>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<TayAo>>(
      `${this.apiUrl}/get-by-page${param}`
    );
  }

  public getAll(): Observable<TayAo[]> {
    return this.http.get<TayAo[]>(`${this.apiUrl}/get-all`);
  }

  public getAllActive(): Observable<TayAo[]> {
    return this.http.get<TayAo[]>(`${this.apiUrl}/all-active`);
  }

  // 2
  public add(coAo: TayAo): Observable<TayAo> {
    return this.http.post<TayAo>(`${this.apiUrl}/add`, coAo);
  }

  // 3
  public getById(id: number): Observable<TayAo> {
    return this.http.get<TayAo>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 4
  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}`, {
      responseType: "text",
    });
  }

  // 5
  public update(chatLieu: TayAo): Observable<TayAo> {
    return this.http.put<TayAo>(`${this.apiUrl}/update`, chatLieu);
  }
}
