import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponse } from "../model/interface/customer-response.interface";

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
    return this.http.get<CustomerResponse>(`${this.apiUrl}/getById/${id}`);
  }

  //
  public updateAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(`${this.apiUrl}/update-avatar`, formData);
  }
}
