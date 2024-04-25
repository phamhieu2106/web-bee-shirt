import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MauSac } from "../model/class/mau-sac.class";
import { PagedResponse } from "../model/interface/paged-response.interface";

@Injectable({
  providedIn: "root",
})
export class MauSacService {
  private readonly apiUrl = "http://localhost:8080/mau-sac";

  constructor(private http: HttpClient) {}

  // 1
  public add(mauSac: MauSac, file: File): Observable<MauSac> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(mauSac));
    formData.append("mauSacImage", file);
    return this.http.post<MauSac>(`${this.apiUrl}/add`, formData);
  }

  // 2
  public getByPage(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<MauSac>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<MauSac>>(
      `${this.apiUrl}/get-by-page${param}`
    );
  }

  // 3
  public getAll(): Observable<MauSac[]> {
    return this.http.get<MauSac[]>(`${this.apiUrl}/get-all`);
  }

  public getAllActiveColors(): Observable<MauSac[]> {
    return this.http.get<MauSac[]>(`${this.apiUrl}/all-active`);
  }

  // 4
  public getById(id: number): Observable<MauSac> {
    return this.http.get<MauSac>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 5
  public changeStatus(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/status/${id}`);
  }

  // 6
  public update(mauSac: MauSac, file: File): Observable<MauSac> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(mauSac));
    formData.append("mauSacImage", file);
    return this.http.put<MauSac>(`${this.apiUrl}/update`, formData);
  }
}
