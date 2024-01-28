import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GiaoHangNhanhService {
  constructor(private http: HttpClient) {}
  //token shop
  private client_token = "18076f8d-bcb9-11ee-b1d4-92b443b7a897";

  getTokenPhieuGiaoHang(order_code: string): Observable<any> {
    // set data here
    let rawData = {
      order_codes: [order_code],
    };

    // set url here
    let url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token";

    //set headers here
    const headers = new HttpHeaders().set("Token", this.client_token);
    return this.http.post(url, rawData, { headers });
  }
  getOrderInforByClientOrderCode(orderClientCode: string): Observable<any> {
    let rawData = {
      client_order_code: orderClientCode,
    };
    let url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail-by-client-code";
    //set headers here
    const headers = new HttpHeaders().set("Token", this.client_token);
    return this.http.post(url, rawData, { headers });
  }
}
