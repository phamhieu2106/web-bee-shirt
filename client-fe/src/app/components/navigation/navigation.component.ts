import { Component } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
  showLoginPopup: boolean = false; // Biến để kiểm soát hiển thị phần popup đăng nhập
  showGioHang: boolean = false; 
  constructor() { }

  ngOnInit(): void {
  }

  // Hàm để toggle hiển thị/ẩn phần popup đăng nhập
  toggleLoginPopup() {
    this.showLoginPopup = !this.showLoginPopup;
  }

  openGioHang() {
    this.showGioHang = !this.showGioHang;
  }
}
