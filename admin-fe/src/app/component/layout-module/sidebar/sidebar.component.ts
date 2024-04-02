import { Component } from "@angular/core";

import { AuthenticationService } from "src/app/service/authentication.service";
import { NotificationService } from "src/app/service/notification.service";
import { NhanVien } from "src/app/model/class/nhan-vien.class";

declare var $: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  public loggedUser: NhanVien;

  // constructor, ngOn
  constructor(
    private authService: AuthenticationService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.setInitialSidebarState();
    this.setupSidebar();
    this.setLoggedInformation();
  }

  // private functions
  private setLoggedInformation(): void {
    this.loggedUser = this.authService.getUserFromStorage();
  }

  // public functions
  // 1
  public logout(): void {
    this.authService.logout();
    this.notifService.success("Đăng xuất thành công!");
  }

  // 2
  private setupSidebar(): void {
    $(".menu > ul > li").click((e: any) => {
      $(e.currentTarget).siblings().removeClass("active");
      $(e.currentTarget).toggleClass("active");
      $(e.currentTarget).find("ul").slideToggle();
      $(e.currentTarget).siblings().find("ul").find("li").removeClass("active");
    });

    $(".menu-btn").click(() => {
      $(".sidebar1").toggleClass("active");
    });
  }

  // 3
  private setInitialSidebarState(): void {
    $(".sidebar1").toggleClass("active");
  }
}
