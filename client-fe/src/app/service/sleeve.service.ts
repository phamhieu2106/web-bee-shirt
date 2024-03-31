import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TayAo } from "../model/class/tay-ao.class";

@Injectable({
  providedIn: "root",
})
export class SleeveService {
  private readonly apiUrl = "http://localhost:8080/tay-ao";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllActive(): Observable<TayAo[]> {
    return this.http.get<TayAo[]>(`${this.apiUrl}/all-active`);
  }
}
