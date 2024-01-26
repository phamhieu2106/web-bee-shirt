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

  public add(mauSac: MauSac, file: File): Observable<MauSac> {
    const formData = new FormData();
    formData.append("request", JSON.stringify(mauSac));
    formData.append("mauSacImage", file);
    return this.http.post<MauSac>(`${this.apiUrl}/add`, formData);
  }

  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<MauSac>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<MauSac>>(
      `${this.apiUrl}/get-all${param}`
    );
  }
}
