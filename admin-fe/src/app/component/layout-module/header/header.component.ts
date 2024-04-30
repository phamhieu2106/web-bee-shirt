import { Component } from "@angular/core";

import { AuthenticationService } from "src/app/service/authentication.service";
import { NhanVien } from "src/app/model/class/nhan-vien.class";
import { NotificationService } from "src/app/service/notification.service";
import { NotifService } from "src/app/service/notif.service";
import { Notification } from "src/app/model/class/notification.class";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  public loggedUser: NhanVien;

  // constructor, ngOn
  constructor(
    public authService: AuthenticationService,
    private notifService: NotificationService,
    private notifService2: NotifService
  ) {}

  ngOnInit(): void {
    this.setLoggedInformation();
  }

  // public functions
  public logout(): void {
    this.authService.logout();
    this.notifService.success("Đăng xuất thành công");
  }

  // private functions
  // 1
  private setLoggedInformation(): void {
    this.loggedUser = this.authService.getUserFromStorage();
  }

  // 2
}
