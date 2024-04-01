import { Component } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import Swal, { SweetAlertResult } from "sweetalert2";

import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { NotificationService } from "src/app/service/notification.service";
import { CartItem } from "src/app/model/class/cart-item.class";
import { CartItemService } from "src/app/service/cart.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
  public isPopupShow: boolean = false;
  public isLoggedIn: boolean = false;
  public loggedCustomer: Customer;
  public isCartShow: boolean = false;
  public cartItems: CartItem[] = [];

  // constructor, ngOn
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifService: NotificationService,
    private cartItemService: CartItemService
  ) {}

  ngOnInit(): void {
    this.getIsLoggedInValue();
    this.getCartItems();
  }

  // public functions
  // 1
  public togglePopup(): void {
    this.isPopupShow = !this.isPopupShow;
  }

  // 2
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
        this.authenticationService.logout();
        this.isLoggedIn = false;
        this.loggedCustomer = null;
        this.router.navigate(["/login"]);
        this.notifService.success("Đăng xuất thành công!");
      }
    });
  }

  // 3
  public toggleCart(): void {
    this.isCartShow = !this.isCartShow;
  }

  // private functions
  // 1
  private getIsLoggedInValue(): void {
    this.authenticationService.isLoggedInSubject.subscribe({
      next: (response: boolean) => {
        this.isLoggedIn = response;
        if (this.isLoggedIn) {
          this.loggedCustomer =
            this.authenticationService.getCustomerFromStorage();
        }
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 2
  private getCartItems(): void {
    this.cartItemService.cartItemsInLocalStorage.subscribe({
      next: (response: CartItem[]) => {
        this.cartItems = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }
}
