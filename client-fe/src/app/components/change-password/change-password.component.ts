import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ChangePwdReq2 } from "src/app/model/interface/change-pwd-req2.interface";
import { AuthenticationService } from "src/app/service/authentication.service";
import { NotificationService } from "src/app/service/notification.service";
import Swal, { SweetAlertResult } from "sweetalert2";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent {
  public form: FormGroup;
  public pwdMatch = true;
  private custEmail: string;

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.params.subscribe((params) => {
      this.custEmail = params["email"];
    });
  }

  // public functions
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
  public changePassword(): void {
    Swal.fire({
      title: "Thay đổi mật khẩu?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const req: ChangePwdReq2 = {
          custEmail: this.custEmail,
          newPassword: this.form.get("newPwd").value,
          verifyCode: this.form.get("verifyCode").value,
        };
        this.authService.changePassword2(req).subscribe({
          next: () => {
            this.notifService.success(
              "Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại!"
            );
            this.router.navigate(["/log-in"]);
          },
          error: (errRes: HttpErrorResponse) => {
            this.notifService.error(errRes.error.message);
          },
        });
      }
    });
  }

  // private functions
  //
  private initForm(): void {
    this.form = new FormGroup({
      newPwd: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
      confirmNewPwd: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
      verifyCode: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
    });
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
