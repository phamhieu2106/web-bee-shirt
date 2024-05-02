import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";

import { LoginRequest } from "../model/interface/login-request.interface";
import { Customer } from "../model/class/customer.class";
import { SignUpReq } from "../model/interface/sign-up-req.interface";
import { ChangePwdReq2 } from "../model/interface/change-pwd-req2.interface";
import { ChangePwdReq } from "../model/interface/change-pwd-req.interface";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public readonly apiUrl = "http://localhost:8080/auth";

  private token: string;
  private jwtHelper = new JwtHelperService();
  public isLoggedInSubj = new BehaviorSubject<boolean>(false);
  public loggedCust = new BehaviorSubject<Customer>(null);

  public updateIsLoggedInSubj(value: boolean): void {
    this.isLoggedInSubj.next(value);
  }

  public updateLoggedCust(newCust: Customer): void {
    this.loggedCust.next(newCust);
  }

  // constructor, ngOn
  constructor(private http: HttpClient, private router: Router) {}

  // 1
  public login(loginReq: LoginRequest): Observable<HttpResponse<Customer>> {
    return this.http.post<Customer>(`${this.apiUrl}/client/login`, loginReq, {
      observe: "response",
    });
  }

  // 2
  public logout(): void {
    this.token = null;
    // this.loggedInUsername = null;
    localStorage.removeItem("customer");
    localStorage.removeItem("token");
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
  public getCustomerFromStorage(): Customer {
    return JSON.parse(localStorage.getItem("customer"));
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
          // this.loggedInUsername = subject;
          return true;
        }
        return false;
      }
      return false;
    } else {
      return false;
    }
  }

  // 9
  public signUp(req: SignUpReq): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/sign-up`, req);
  }

  // 10
  public checkEmailForForgetPassword(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/send-verify-code/${email}`);
  }

  // 11
  public changePasswordNoneLogged(req: ChangePwdReq2): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-pwd-none-log`, req);
  }

  // 12
  public changePassword(req: ChangePwdReq): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-pwd-log`, req);
  }
}
