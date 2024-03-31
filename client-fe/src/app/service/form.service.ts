import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { KieuDang } from "../model/class/kieu-dang.class";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private readonly apiUrl = "http://localhost:8080/kieu-dang";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllActive(): Observable<KieuDang[]> {
    return this.http.get<KieuDang[]>(`${this.apiUrl}/all-active`);
  }
}
