import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DotGiamGia } from "../model/class/dot-giam-gia.class";
import { PagedResponse } from "../model/interface/paged-response.interface";

@Injectable({
  providedIn: "root",
})
export class DotGiamGiaService {
  private readonly apiURL = "http://localhost:8080/dot-giam-gia";
  constructor(private http: HttpClient) {}

  public getAllDotGiamGia(): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(this.apiURL);
  }

  public getDotGiamGiaPageSize(
    pageSize: number
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}?pageSize=${pageSize}`
    );
  }

  public getDotGiamGiaPageNumber(
    pageSize: number,
    pageNumber: number
  ): Observable<PagedResponse<DotGiamGia>> {
    return this.http.get<PagedResponse<DotGiamGia>>(
      `${this.apiURL}?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }
}
