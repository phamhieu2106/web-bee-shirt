import { Component } from "@angular/core";

import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";

@Component({
  selector: "app-profile-sidebar",
  templateUrl: "./profile-sidebar.component.html",
  styleUrls: ["./profile-sidebar.component.css"],
})
export class ProfileSidebarComponent {
  public loggedCust: Customer;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loggedCust = this.authService.getCustomerFromStorage();
  }
}
