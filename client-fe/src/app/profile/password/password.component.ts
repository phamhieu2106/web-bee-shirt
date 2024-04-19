import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ChangePwdReq } from "src/app/model/interface/change-pwd-req.interface";
import { AuthenticationService } from "src/app/service/authentication.service";
import { CustomerService } from "src/app/service/customer.service";
import { NotificationService } from "src/app/service/notification.service";
import Swal, { SweetAlertResult } from "sweetalert2";

@Component({
  selector: "app-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.css"],
})
export class PasswordComponent {
  public form: FormGroup;
  public pwdMatch = true;

  // constructor, ngOn
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private customerService: CustomerService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // public functions
  public changePassword(): void {
    Swal.fire({
      title: "Xác nhận đổi mật khẩu?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const accId = this.authService.getCustomerFromStorage().account.id;
        const req: ChangePwdReq = {
          accId,
          oldPassword: this.form.get("oldPwd").value.trim(),
          newPassword: this.form.get("newPwd").value.trim(),
        };
        this.customerService.changePassword(req).subscribe({
          next: () => {
            this.notifService.success(
              "Đổi mật khẩu thành công. Vui lòng đăng nhập lại!"
            );
            this.authService.logout();
            this.authService.updateIsLoggedInSubj(false);
            this.router.navigate(["/log-in"]);
          },
          error: (errRes: HttpErrorResponse) => {
            this.notifService.error(
              `Đổi mật khẩu thất bại! ${errRes.error.message})`
            );
          },
        });
      }
    });
  }

  // private functions
  //
  private initForm(): void {
    this.form = new FormGroup({
      oldPwd: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
      newPwd: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
      confirmNewPwd: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
    });
  }

  //
  public checkMatch(): void {
    const newPwd = this.form.get("newPwd").value;
    const confirmNewPwd = this.form.get("confirmNewPwd").value;

    if (newPwd && confirmNewPwd && newPwd !== confirmNewPwd) {
      this.pwdMatch = false;
    } else if (newPwd && confirmNewPwd && newPwd === confirmNewPwd) {
      this.pwdMatch = true;
    }
  }

  //
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
