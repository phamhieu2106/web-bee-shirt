import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KieuThietKe } from "../model/class/kieu-thiet-ke.class";

@Injectable({
  providedIn: "root",
})
export class DesignService {
  private readonly apiUrl = "http://localhost:8080/thiet-ke";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllActive(): Observable<KieuThietKe[]> {
    return this.http.get<KieuThietKe[]>(`${this.apiUrl}/all-active`);
  }
}
