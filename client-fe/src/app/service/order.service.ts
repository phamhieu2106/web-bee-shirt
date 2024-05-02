import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { OnlineOrderRequest } from "../model/interface/online-order-request.interface";
import { Order } from "../model/class/order.class";
import { ChangeOrderStatusReq } from "../model/interface/change-order-status-req.interface";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private readonly apiUrl = "http://localhost:8080/hoa-don";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public placeOrderOnline(req: OnlineOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/place-order-online`, req);
  }

  // 2
  public getByCode(code: string): Observable<Order> {
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

  // 4
  public getNoneLoggedOrdersByPhone(phone: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/none-logged-orders/${phone}`);
  }

  // 5
  public cancelOrder(req: ChangeOrderStatusReq): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-status/cancel`, req);
  }

  public paymentWithVNPay(req: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/payment-vnpay`, req, {
      responseType: "text",
    });
  }
}
