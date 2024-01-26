import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { CoAo } from "../model/class/co-ao.class";

@Injectable({
  providedIn: "root",
})
export class KieuCoAoService {
  private readonly apiUrl = "http://localhost:8080/co-ao";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<CoAo>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<CoAo>>(`${this.apiUrl}/get-all${param}`);
  }

  // 2
  public add(coAo: CoAo): Observable<CoAo> {
    return this.http.post<CoAo>(`${this.apiUrl}/add`, coAo);
  }

  // 3
  public getById(id: number): Observable<CoAo> {
    return this.http.get<CoAo>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 4
  public changeStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}`, {
      responseType: "text",
    });
  }

  // 5
  public update(chatLieu: CoAo): Observable<CoAo> {
    return this.http.put<CoAo>(`${this.apiUrl}/update`, chatLieu);
  }
}
