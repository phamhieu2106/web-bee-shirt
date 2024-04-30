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
  public getDiscountsForLoggedCheckOut(
    priceCondition: number,
    custId: number
  ): Observable<Discount[]> {
    return this.http.get<Discount[]>(
      `${this.apiUrl}/discounts-for-logged-checkout/${priceCondition}/${custId}`
    );
  }

  // 2
  public getDiscountsForNoneLoggedCheckOut(
    priceCondition: number
  ): Observable<Discount[]> {
    return this.http.get<Discount[]>(
      `${this.apiUrl}/discounts-for-none-logged-checkout/${priceCondition}`
    );
  }

  // 3
  public getAllDiscountsOf1Cust(custId: number): Observable<Discount[]> {
    return this.http.get<Discount[]>(
      `${this.apiUrl}/discounts-by-cust/${custId}`
    );
  }

  // 4
  public getAllDiscountsForNoneLog(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.apiUrl}/none-log-discounts`);
  }
}
