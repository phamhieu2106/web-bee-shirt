import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { OnlineOrderRequest } from "../model/interface/online-order-request.interface";
import { Order } from "../model/class/order.class";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private readonly apiUrl = "http://localhost:8080/hoa-don";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public placeOrderOnline(req: OnlineOrderRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/place-order-online`, req, {
      responseType: "text",
    });
  }

  // 2
  public getByCode(code: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/get-by-code/${code}`);
  }

  // 3
  public getOrdersForClient(
    custId: number,
    status: string
  ): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.apiUrl}/all-orders/${custId}/${status}`
    );
  }
}
