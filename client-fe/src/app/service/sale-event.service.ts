import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SaleEvent } from "../model/class/sale-event.class";

@Injectable({
  providedIn: "root",
})
export class SaleEventService {
  private readonly apiUrl = "http://localhost:8080/dot-giam-gia";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getSaleEventOfProd(prodId: number): Observable<SaleEvent> {
    return this.http.get<SaleEvent>(
      `${this.apiUrl}/client/get-sale-event-1/${prodId}`
    );
  }

  // 2
  public getSaleEventOfProdDetails(prodId: number): Observable<SaleEvent> {
    return this.http.get<SaleEvent>(
      `${this.apiUrl}/client/get-sale-event-2/${prodId}`
    );
  }

  // 3
  public getSaleEventOfProdDetails2(
    prodId: number,
    colorId: number,
    sizeId: number
  ): Observable<SaleEvent> {
    return this.http.get<SaleEvent>(
      `${this.apiUrl}/client/get-sale-event-3/${prodId}/${colorId}/${sizeId}`
    );
  }
}
