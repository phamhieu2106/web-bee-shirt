import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Discount } from "../model/class/discount.class";

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
  ): Observable<Discount[]> {
    return this.http.get<Discount[]>(
      `${this.apiUrl}/discount-for-checkout/${priceCondition}/${custId}`
    );
  }

  // 2
  public getAllDiscountsOf1Cust(custId: number): Observable<Discount[]> {
    return this.http.get<Discount[]>(
      `${this.apiUrl}/discount-by-cust/${custId}`
    );
  }
}
