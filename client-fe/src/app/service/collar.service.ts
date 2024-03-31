import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CoAo } from "../model/class/co-ao.class";

@Injectable({
  providedIn: "root",
})
export class CollarService {
  private readonly apiUrl = "http://localhost:8080/co-ao";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllActive(): Observable<CoAo[]> {
    return this.http.get<CoAo[]>(`${this.apiUrl}/all-active`);
  }
}
