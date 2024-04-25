import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { KichCo } from "../model/class/kich-co.class";

@Injectable({
  providedIn: "root",
})
export class KichCoService {
  private readonly apiUrl = "http://localhost:8080/kich-co";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getByPage(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<KichCo>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<KichCo>>(
      `${this.apiUrl}/get-by-page${param}`
    );
  }

  //
  public getAll(): Observable<KichCo[]> {
    return this.http.get<KichCo[]>(`${this.apiUrl}/get-all`);
  }

  //
  public getAllActiveSizes(): Observable<KichCo[]> {
    return this.http.get<KichCo[]>(`${this.apiUrl}/all-active`);
  }

  // 2
  public add(kichCo: KichCo): Observable<KichCo> {
    return this.http.post<KichCo>(`${this.apiUrl}/add`, kichCo);
  }

  // 3
  public getById(id: number): Observable<KichCo> {
    return this.http.get<KichCo>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 4
  public changeStatus(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/status/${id}`);
  }

  // 5
  public update(kichCo: KichCo): Observable<KichCo> {
    return this.http.put<KichCo>(`${this.apiUrl}/update`, kichCo);
  }
}
