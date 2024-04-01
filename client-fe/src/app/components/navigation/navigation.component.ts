import { Component } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import Swal, { SweetAlertResult } from "sweetalert2";

import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { NotificationService } from "src/app/service/notification.service";
import { CartItem } from "src/app/model/class/cart-item.class";
import { CartItemService } from "src/app/service/cart.service";
import { ProductService } from "src/app/service/product.service";

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
  public cartItemQuantity: number;

  // constructor, ngOn
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifService: NotificationService,
    private cartItemService: CartItemService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getIsLoggedInValue();
    // subcribe cart item in localstorage quantity
    this.cartItemService.cartItemsInLocalStorageQuantity.subscribe(
      (quantity: number) => {
        this.cartItemQuantity = quantity;
      }
    );
    this.cartItemService.cartItemsInLocalStorage.subscribe(
      (response: CartItem[]) => {
        this.cartItems = response;
      }
    );

    const cartItemsInLocalStorage = localStorage.getItem("cartItems");
    if (cartItemsInLocalStorage === null) {
      const initCartItems: CartItem[] = [];
      localStorage.setItem("cartItems", JSON.stringify(initCartItems));
    }
    this.cartItems = JSON.parse(localStorage.getItem("cartItems"));
    this.cartItemService.cartItemsInLocalStorageQuantity.next(
      this.cartItems.length
    );
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

  // 4
  public getProductNameByProductDetails(id: number): string {
    this.productService.getProductNameByProductDetails(id).subscribe({
      next: (response: string) => {
        return response;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
    return "";
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
  // private getCartItems(): void {
  //   this.cartItemService.cartItemsInLocalStorage.subscribe({
  //     next: (response: CartItem[]) => {
  //       this.cartItems = response;
  //       this.cartItemQuantity = response.length;
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       this.notifService.error(errorResponse.error.message);
  //     },
  //   });
  // }
}
