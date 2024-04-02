import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public loading: boolean;
  public loginForm: FormGroup;
  public passwordInputType = true;

  // constructor, ngOn
  constructor(
    private router: Router,
    private notifService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    this.initFormLogin();
  }

  // public functions
  // 1
  public togglePasswordInputType(): void {
    this.passwordInputType = !this.passwordInputType;
  }

  // 2
  public login(): void {
    this.authenticationService.login(this.loginForm.value).subscribe({
      // - login succeed => lấy token từ server, lưu token và object: user vào localStorage
      next: (response: HttpResponse<Customer>) => {
        const token = response.headers.get("Jwt-Token");
        this.authenticationService.saveTokenToStorage(token);
        this.authenticationService.saveCustomerToStorage(response.body);

        this.notifService.success("Đăng nhập thành công!");
        this.router.navigate(["/"]);
        this.authenticationService.isLoggedInSubject.next(true);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // private functions
  // 1
  private checkLogin(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.notifService.warning("Bạn cần đăng xuất để đến trang đăng nhập!");
      this.router.navigate(["/"]);
    }
  }

  // 2
  private initFormLogin(): void {
    this.loginForm = new FormGroup({
      tenDangNhap: new FormControl("0807760922", [Validators.required]),
      matKhau: new FormControl("fjJgF", [Validators.required]),
    });
  }
}
