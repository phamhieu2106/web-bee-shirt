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

  // 4
  public getById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/get-by-id/${id}`);
  }

  // 5
  public deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-by-id/${id}`);
  }

  // 6
  public updateAddress(
    addrId: number,
    req: AddAddressReq
  ): Observable<Address> {
    return this.http.put<Address>(
      `${this.apiUrl}/client/update/${addrId}`,
      req
    );
  }
}
