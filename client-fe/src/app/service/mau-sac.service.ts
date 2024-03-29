import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MauSac } from "../model/class/mau-sac.class";

@Injectable({
  providedIn: "root",
})
export class MauSacService {
  private readonly apiUrl = "http://localhost:8080/mau-sac";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllColorOfProduct(productId: number): Observable<MauSac[]> {
    return this.http.get<MauSac[]>(
      `${this.apiUrl}/colors-of-product/${productId}`
    );
  }
}
