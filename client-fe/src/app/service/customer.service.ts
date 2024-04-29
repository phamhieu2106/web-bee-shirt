import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CustomerResponse } from "../model/interface/customer-response.interface";
import { Customer } from "../model/class/customer.class";
import { UpdateCustInfoReq } from "../model/interface/update-cust-info-req.interface";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private readonly apiUrl = "http://localhost:8080/khach-hang";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getById(id: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.apiUrl}/cust-by-id/${id}`);
  }

  // 2
  public updateAvatar(custId: number, file: File): Observable<Customer> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<Customer>(
      `${this.apiUrl}/update-avatar/${custId}`,
      formData
    );
  }

  // 3
  public updateInfo(req: UpdateCustInfoReq): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/update-info`, req);
  }
}
