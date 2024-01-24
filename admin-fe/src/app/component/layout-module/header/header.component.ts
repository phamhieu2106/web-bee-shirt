import { Component } from "@angular/core";

import { AuthenticationService } from "src/app/service/authentication.service";
import { NhanVien } from "src/app/model/class/nhan-vien.class";
import Swal from "sweetalert2";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  public loggedUser: NhanVien;

  // constructor, ngOn
  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.setLoggedInformation();
  }

  // private function
  private setLoggedInformation(): void {
    this.loggedUser = this.authService.getUserFromStorage();
  }

  // public function
  public logout(): void {
    this.authService.logout();
    Swal.fire({
      icon: "success",
      title: "Đăng xuất thành công!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
