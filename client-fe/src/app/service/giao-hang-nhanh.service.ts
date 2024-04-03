import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AddressShipFee } from "../model/class/address-ship-fee.class";

@Injectable({
  providedIn: "root",
})
export class GiaoHangNhanhService {
  // token shop
  private readonly client_token = "18076f8d-bcb9-11ee-b1d4-92b443b7a897";

  constructor(private http: HttpClient) {}

  // 1
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

  // 2
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

  // 3 get all tỉnh
  getAllProvince(): Observable<any> {
    let url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";
    const headers = new HttpHeaders().set("Token", this.client_token);
    return this.http.get(url, { headers });
  }

  // 4 get all huyện by tỉnh
  getAllDistrictByProvinceID(province_id: number): Observable<any> {
    let url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district";
    const headers = new HttpHeaders().set("Token", this.client_token);
    const rawData = { province_id: Number(province_id) };
    return this.http.post(url, rawData, { headers });
  }

  // 5 get all xã by huyện
  getAllWardByDistrictID(DistrictID: number): Observable<any> {
    let url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
    const headers = new HttpHeaders().set("Token", this.client_token);
    const rawData = { district_id: Number(DistrictID) };
    return this.http.post(url, rawData, { headers });
  }

  // 6 get thời gian dự kiến
  getExpectedDeliveryTime(addressShipFee: AddressShipFee): Observable<any> {
    let url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime";
    const headers = new HttpHeaders()
      .set("Token", this.client_token)
      .set("ShopId", "190872");
    let rawData = {
      from_district_id: 3440,
      from_ward_code: "13010",
      to_ward_code: addressShipFee.xaCode,
      to_district_id: Number(addressShipFee.huyenId),
      service_id: 53320,
    };
    return this.http.post(url, rawData, { headers });
  }

  // 7 get phí vận chuyển
  getFee(addressShipFee: AddressShipFee, service_id: number): Observable<any> {
    let shopId = 190872;
    let url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
    const headers = new HttpHeaders()
      .set("Token", this.client_token)
      .set("ShopId", shopId + "");

    let rawData = {
      to_district_id: Number(addressShipFee.huyenId),
      to_ward_code: addressShipFee.xaCode,
      weight: 400,
      service_id,
    };
    return this.http.post(url, rawData, { headers });
  }

  // 8 get service
  getService(
    shop_id: number,
    from_district: number,
    to_district: number
  ): Observable<any> {
    let url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services";
    const headers = new HttpHeaders().set("Token", this.client_token);
    let rawData = {
      shop_id: Number(shop_id),
      from_district: Number(from_district),
      to_district: Number(to_district),
    };
    return this.http.post(url, rawData, { headers });
  }
}
