import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.css"],
})
export class MyAccountComponent {
  public form: FormGroup;
  private loggedCust: Customer;

  // constructor, ngOn
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  // public functions
  //
  public updateInfor(): void {
    console.log(this.form.value);
  }

  // private functions
  private initForm(): void {
    this.loggedCust = this.authService.getCustomerFromStorage();

    this.form = new FormGroup({
      email: new FormControl(this.loggedCust.email, [Validators.required]),
      gioiTinh: new FormControl(this.loggedCust.gioiTinh, [
        Validators.required,
      ]),
      hoTen: new FormControl(this.loggedCust.hoTen, [Validators.required]),
      ngaySinh: new FormControl(
        new Date(this.loggedCust.ngaySinh).toISOString().slice(0, -1),
        [Validators.required]
      ),
      sdt: new FormControl(this.loggedCust.sdt, [Validators.required]),
    });
  }
}
