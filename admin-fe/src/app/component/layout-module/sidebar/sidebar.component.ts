import { Component, AfterViewInit } from '@angular/core';
import { AuthenticationService } from "src/app/service/authentication.service";
import { NhanVien } from "src/app/model/class/nhan-vien.class";
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public loggedUser: NhanVien

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.setInitialSidebarState();
    this.setupSidebar();
   

    this.setLoggedInformation();
  }

  setupSidebar(): void {
    $('.menu > ul > li').click((e: any) => {
      $(e.currentTarget).siblings().removeClass('active');
      $(e.currentTarget).toggleClass('active');
      $(e.currentTarget).find('ul').slideToggle();
      $(e.currentTarget).siblings().find('ul').find('li').removeClass('active');
    });

    $('.menu-btn').click(() => {
      $('.sidebar1').toggleClass('active');
    });
  }

  setInitialSidebarState(): void {
    $('.sidebar1').toggleClass('active');
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
