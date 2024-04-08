import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Address } from "../model/class/address.class";
import { AddAddressReq } from "../model/interface/add-address-req.interface";

@Injectable({
  providedIn: "root",
})
export class AddressService {
  private readonly apiUrl = "http://localhost:8080/dia-chi";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllAddressOf1Customer(custId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/get-all/${custId}`);
  }

  // 2
  public setDefaultAddress(addressId: number): Observable<Address> {
    return this.http.post<Address>(
      `${this.apiUrl}/set-default/${addressId}`,
      []
    );
  }

  // 3
  public addAddress(req: AddAddressReq): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/client/add`, req);
  }
}
