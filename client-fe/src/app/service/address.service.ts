import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Address } from "../model/class/address.class";

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
  public addAddress(idKh: number, dc: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/add/${idKh}`, dc);
  }
}
