import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Address } from "../model/class/address.class";

@Injectable({
  providedIn: "root",
})
export class DiscountService {
  private readonly apiUrl = "http://localhost:8080/phieu-giam-gia";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getDiscountsForCheckOut(
    priceCondition: number,
    custId: number
  ): Observable<Address[]> {
    return this.http.get<Address[]>(
      `${this.apiUrl}/discount-for-checkout/${priceCondition}/${custId}`
    );
  }
}
