import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "src/app/service/authentication.service";
import { NotificationService } from "src/app/service/notification.service";
import { NhanVien } from "src/app/model/class/nhan-vien.class";
import Swal, { SweetAlertResult } from "sweetalert2";

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
    private router: Router,
    private authService: AuthenticationService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getUserFromStorage();

    this.setInitialSidebarState();
    this.setupSidebar();
  }

  // public functions
  // 1
  public logout(): void {
    Swal.fire({
      title: "Bạn muốn đăng xuất?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.notifService.success("Đăng xuất thành công!");
        this.router.navigateByUrl("/log-in");
      }
    });
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
