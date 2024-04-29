import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";

import { JwtHelperService } from "@auth0/angular-jwt";

import { AdminLoginReq } from "../model/interface/admin-login-req.interface";
import { NhanVien } from "../model/class/nhan-vien.class";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public apiUrl = "http://localhost:8080/auth/admin";
  private token: string;
  // private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();
  public isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  // public functions
  // 1
  public login(
    loginRequest: AdminLoginReq
  ): Observable<HttpResponse<NhanVien>> {
    return this.http.post<NhanVien>(`${this.apiUrl}/login`, loginRequest, {
      observe: "response",
    });
  }

  // 2
  public logout(): void {
    this.token = null;
    // this.loggedInUsername = null;
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
  public saveUserToStorage(nhanVien: NhanVien): void {
    localStorage.setItem("nhanVien", JSON.stringify(nhanVien));
  }

  // 5
  public getUserFromStorage(): NhanVien {
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
          // this.loggedInUsername = subject;
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
