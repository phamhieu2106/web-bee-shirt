import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import Swal from "sweetalert2";

import { AuthenticationService } from "src/app/service/authentication.service";
import { NhanVien } from "src/app/model/class/nhan-vien.class";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public isLoading: boolean;
  public loginForm: FormGroup;
  public pwdInputType = true;

  // constructor, ngOn
  constructor(
    private router: Router,
    private notifService: NotificationService,
    private authenticationService: AuthenticationService
  ) {
    this.initLoginForm();
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  // public functions
  // 1
  public togglePwdInputType(): void {
    this.pwdInputType = !this.pwdInputType;
  }

  // 2
  public login(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.authenticationService.login(this.loginForm.value).subscribe({
        // - login succeed => lấy token từ server, lưu token và object: user vào localStorage
        next: (response: HttpResponse<NhanVien>) => {
          const token = response.headers.get("Jwt-Token");
          this.authenticationService.saveTokenToStorage(token);
          this.authenticationService.saveUserToStorage(response.body);

          this.notifService.success("Đăng nhập thành công!");
          this.authenticationService.isLoggedInSubject.next(true);
          if (response.body.account.role === "ROLE_ADMIN") {
            this.router.navigate(["/thong-ke"]);
          } else {
            this.router.navigate(["/ban-hang"]);
          }
          this.isLoading = false;
        },
        error: (errResp: HttpErrorResponse) => {
          this.notifService.error(errResp.error.message);
          this.isLoading = false;
        },
      });
    }, 1000);
  }

  // private functions
  // 1
  private checkLogin(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.notifService.warning("Bạn cần đăng xuất để đến trang đăng nhập!");
      this.router.navigate(["/thong-ke"]);
    }
  }

  // 2
  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("duongviethung2003@gmail.com", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
      password: new FormControl("123456", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
    });
  }

  // 3
  private customNotBlankValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }
}
