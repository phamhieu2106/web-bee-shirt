import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";

import { LoginRequest } from "../model/interface/login-request.class";
import { Customer } from "../model/class/customer.class";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public readonly apiUrl = "http://localhost:8080";
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();
  public isLoggedInSubject = new BehaviorSubject<boolean>(true);

  // constructor, ngOn
  constructor(private http: HttpClient, private router: Router) {}

  // 1
  public login(loginReq: LoginRequest): Observable<HttpResponse<Customer>> {
    return this.http.post<Customer>(
      `${this.apiUrl}/auth/customer/login`,
      loginReq,
      {
        observe: "response",
      }
    );
  }

  // 2
  public logout(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem("nhanVien");
    localStorage.removeItem("token");
    this.isLoggedInSubject.next(false);
    this.router.navigate(["/login"]);
  }

  // 3
  public saveTokenToStorage(token: string): void {
    this.token = token;
    localStorage.setItem("token", token);
  }

  // 4
  public saveCustomerToStorage(customer: Customer): void {
    localStorage.setItem("customer", JSON.stringify(customer));
  }

  // 5
  public getUserFromStorage(): Customer {
    return JSON.parse(localStorage.getItem("nhanVien"));
  }

  // 6
  public getTokenFromStorage(): string {
    return this.token;
  }

  // 7
  public loadTokenFromStorage(): void {
    this.token = localStorage.getItem("token");
  }

  // 8
  /*
  - loggedIn = true khi decode token được subject(username) not empty và token chưa hết hạn
  - token chưa hết hạn đồng nghĩa rằng token đó được decode và not empty
  */
  public isLoggedIn(): boolean {
    this.loadTokenFromStorage();
    if (this.token != null && this.token != "") {
      let subject = this.jwtHelper.decodeToken(this.token).sub;
      if (subject != null && this.token != "") {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = subject;
          return true;
        }
        return false;
      }
      return false;
    } else {
      // this.logout();
      return false;
    }
  }
}
