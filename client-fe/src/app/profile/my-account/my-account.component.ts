import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Customer } from "src/app/model/class/customer.class";
import { CustomerResponse } from "src/app/model/interface/customer-response.interface";
import { UpdateCustInfoReq } from "src/app/model/interface/update-cust-info-req.interface";
import { AuthenticationService } from "src/app/service/authentication.service";
import { CustomerService } from "src/app/service/customer.service";
import { NotificationService } from "src/app/service/notification.service";
import Swal, { SweetAlertResult } from "sweetalert2";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.css"],
})
export class MyAccountComponent {
  public form: FormGroup;
  private loggedCust: Customer;

  // constructor, ngOn
  constructor(
    private authService: AuthenticationService,
    private customerService: CustomerService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // public functions
  //
  public updateInfor(): void {
    Swal.fire({
      title: "Thay đổi thông tin tài khoản?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lưu",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const req: UpdateCustInfoReq = {
          custId: this.loggedCust.id,
          fullName: this.form.get("hoTen").value.trim(),
          phone: this.form.get("sdt").value.trim(),
          birthday: this.form.get("ngaySinh").value,
          gender: this.form.get("gioiTinh").value,
        };

        this.customerService.updateInfo(req).subscribe({
          next: (custRes: Customer) => {
            this.notifService.success(
              "Cập nhật thông tin tài khoản thành công!"
            );
            this.authService.saveCustomerToStorage(custRes);
            this.initForm();
          },
          error: (errorRes: HttpErrorResponse) => {
            this.notifService.error(errorRes.error.message);
          },
        });
      }
    });
  }

  // private functions
  // 1
  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required]),
      gioiTinh: new FormControl("", [Validators.required]),
      hoTen: new FormControl("", [Validators.required]),
      ngaySinh: new FormControl("", [Validators.required]),
      sdt: new FormControl("", [Validators.required]),
      tenDangNhap: new FormControl("", [Validators.required]),
    });

    this.loggedCust = this.authService.getCustomerFromStorage();

    this.customerService.getById(this.loggedCust.id).subscribe({
      next: (custRes: CustomerResponse) => {
        this.form = new FormGroup({
          email: new FormControl(custRes.email),
          gioiTinh: new FormControl(custRes.gioiTinh, [Validators.required]),
          hoTen: new FormControl(custRes.hoTen, [
            Validators.required,
            Validators.pattern("^[a-zA-ZÀ-ỹ\\s]+$"),
            this.customRequiredValidator,
          ]),
          ngaySinh: new FormControl(custRes.ngaySinh, [
            Validators.required,
            this.pastDateValidator,
          ]),
          sdt: new FormControl(custRes.sdt, [
            Validators.required,
            Validators.pattern("^(0[1-9][0-9]{8})$"),
            this.customRequiredValidator,
          ]),
          tenDangNhap: new FormControl(custRes.tenDangNhap),
        });
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 1.1
  private pastDateValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate >= currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  // 1.2
  private customRequiredValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }
}
