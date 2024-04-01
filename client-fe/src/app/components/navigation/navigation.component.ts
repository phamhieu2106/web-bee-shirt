import { Component } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
  public isPopupShow: boolean = false;
  public isLoggedIn: boolean = false;
  showGioHang: boolean = false;

  // constructor, ngOn
  constructor() {}

  ngOnInit(): void {}

  // public functions
  // 1
  public togglePopup(): void {
    this.isPopupShow = !this.isPopupShow;
  }

  // private functions
  // private getCartItems(): void {
  //   const loggedUser = this.authenticationService.getUserFromStorage();
  //   if (loggedUser === null) {
  //     return;
  //   }
  //   this.cartItemService.getCartItemsByUserId(loggedUser.id).subscribe(
  //     (data: CartItem[]) => {
  //       this.cartItems = data;
  //       this.cartItemService.setQuantity(data.length);
  //     },
  //     (errorResponse: HttpErrorResponse) => {
  //       this.toastr.error(
  //         `Lỗi hệ thống: ${errorResponse.error.message}`,
  //         "Hệ thống"
  //       );
  //     }
  //   );
  // }

  openGioHang() {
    this.showGioHang = !this.showGioHang;
  }
}
