import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from "@angular/core";
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
  public role: string;

  @ViewChildren('listSidebar > li') listItems: QueryList<ElementRef>;

  // constructor, ngOn
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notifService: NotificationService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getUserFromStorage();
    this.role = this.loggedUser.account.role.split("_")[1];

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

  public checkSideBar = true
  private setupSidebar(): void {
   
   
    $(".menu > ul > li ").click((e: any) => {
      
      $(e.currentTarget).siblings().removeClass("active");
      $(e.currentTarget).toggleClass("active");
      $(e.currentTarget).find(".sub-menu ").slideToggle();
      $(e.currentTarget).siblings().find("ul").find("li").removeClass("active");
    });

    
    $(".menu-btn").click(() => {
      $(".sidebar1").toggleClass("active");
    });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  // 3
  private setInitialSidebarState(): void {
    $(".sidebar1").toggleClass("active");
  }

  ngAfterViewInit() {
    this.listItems.forEach(item => {
      this.renderer.listen(item.nativeElement, 'click', () => {
        
       console.log(item.nativeElement)
      });
    });
  }
}
