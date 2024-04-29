import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TestService {
  private readonly apiUrl = "http://localhost:8080/test";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public sayCustomer(): Observable<string> {
    return this.http.get(`${this.apiUrl}/say-cust`, { responseType: "text" });
  }
}
