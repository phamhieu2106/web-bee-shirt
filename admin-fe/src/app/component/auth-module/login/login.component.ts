import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

import { AuthenticationService } from "src/app/service/authentication.service";
import { NhanVien } from "src/app/model/class/nhan-vien.class";

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
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = new FormGroup({
      tenDangNhap: new FormControl("admin0203", [Validators.required]),
      matKhau: new FormControl("12345678", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  // public function
  public togglePasswordInputType(): void {
    this.passwordInputType = !this.passwordInputType;
  }

  public loginSubmit(): void {
    this.loading = true;
    this.authenticationService.login(this.loginForm.value).subscribe({
      // - login succeed => lấy token từ server, lưu token và object: user vào localStorage
      next: (response: HttpResponse<NhanVien>) => {
        const token = response.headers.get("Jwt-Token");
        this.authenticationService.saveTokenToStorage(token);
        this.authenticationService.saveUserToStorage(response.body);

        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/";
        this.authenticationService.isLoggedInSubject.next(true);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        // login fail => thông báo
        Swal.fire({
          icon: "error",
          title: "Đăng nhập thất bại!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.toastr.error(error.message, "Hệ thống");
        this.loading = false;
      },
    });
  }

  // private function
  private checkLogin(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.toastr.warning(
        "Bạn cần đăng xuất để đến trang đăng nhập!",
        "Hệ thống"
      );
      this.router.navigate(["/admin"]);
    }
  }
}
