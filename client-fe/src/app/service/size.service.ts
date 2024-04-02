import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { KichCo } from "../model/class/kich-co.class";

@Injectable({
  providedIn: "root",
})
export class SizeService {
  private readonly apiUrl = "http://localhost:8080/kich-co";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllByProductAndColor(
    productId: number,
    colorId: number
  ): Observable<KichCo[]> {
    return this.http.get<KichCo[]>(
      `${this.apiUrl}/by-product-color/${productId}/${colorId}`
    );
  }

  // 2
  public getAllActiveSizes(): Observable<KichCo[]> {
    return this.http.get<KichCo[]>(`${this.apiUrl}/all-active`);
  }
}
