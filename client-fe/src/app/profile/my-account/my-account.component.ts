import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Customer } from "src/app/model/class/customer.class";
import { CustomerResponse } from "src/app/model/interface/customer-response.interface";
import { AuthenticationService } from "src/app/service/authentication.service";
import { CustomerService } from "src/app/service/customer.service";
import { NotificationService } from "src/app/service/notification.service";

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
  public updateInfor(): void {}

  // private functions
  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required]),
      gioiTinh: new FormControl("", [Validators.required]),
      hoTen: new FormControl("", [Validators.required]),
      ngaySinh: new FormControl("", [Validators.required]),
      sdt: new FormControl("", [Validators.required]),
    });

    this.loggedCust = this.authService.getCustomerFromStorage();

    this.customerService.getById(this.loggedCust.id).subscribe({
      next: (custRes: CustomerResponse) => {
        console.log(custRes);

        this.form = new FormGroup({
          email: new FormControl(custRes.email, [Validators.required]),
          gioiTinh: new FormControl(custRes.gioiTinh, [Validators.required]),
          hoTen: new FormControl(custRes.hoTen, [Validators.required]),
          ngaySinh: new FormControl(custRes.ngaySinh, [Validators.required]),
          sdt: new FormControl(custRes.sdt, [Validators.required]),
        });
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }
}
