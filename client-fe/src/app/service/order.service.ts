import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PlaceOrderRequest } from "../model/interface/place-order-request.interface";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private readonly apiUrl = "http://localhost:8080/hoa-don";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public placeOrder(req: PlaceOrderRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/place-order`, req);
  }
}
