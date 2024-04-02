import { Component } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";

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

  public cartItems1: CartItem[] = [];
  public cartItemQuantity1: number;
  public cartItems2: CartItem[] = [];
  public cartItemQuantity2: number;

  // constructor, ngOn
  constructor(
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private authenticationService: AuthenticationService,
    private notifService: NotificationService,
    private cartItemService: CartItemService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getIsLoggedInValue();
    this.getCartItemsFromLocalStorage();
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

  // 5
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 6
  public updateQuantity(cartItem: CartItem, type: string): void {
    // kiểm tra trước khi tăng/giảm
    if (type === "minus" && cartItem.soLuong === 1) {
      this.notifService.warning("Số lượng trong giỏ phải lớn hơn 0!");
      return;
    } else if (
      type === "plus" &&
      cartItem.soLuong === cartItem.spct.soLuongTon
    ) {
      this.notifService.warning("Số lượng tồn của sản phẩm này không đủ!");
      return;
    }

    let cartItemsInstorage: CartItem[] = JSON.parse(
      localStorage.getItem("cartItems")
    );
    cartItemsInstorage = cartItemsInstorage.map((item: CartItem) => {
      if (item.spct.id === cartItem.spct.id) {
        item.soLuong = type === "plus" ? item.soLuong + 1 : item.soLuong - 1;
        return item;
      }
      return item;
    });
    this.cartItemService.updateCartItemsInStorage(cartItemsInstorage);
  }

  // 7
  public deleteItemFromCart(cartItem: CartItem): void {
    Swal.fire({
      title: "Xóa sản phẩm này khỏi giỏ hàng?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        let cartItemsInstorage: CartItem[] = JSON.parse(
          localStorage.getItem("cartItems")
        );
        cartItemsInstorage = cartItemsInstorage.filter(
          (item: CartItem) => !(item.spct.id === cartItem.spct.id)
        );
        this.cartItemService.updateCartItemsInStorage(cartItemsInstorage);
        this.notifService.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      }
    });
  }

  // 8
  public calculateTotalMoney(): string {
    let totalMoney: number = 0;

    for (const cartItem of this.cartItems1) {
      totalMoney += cartItem.spct.giaBan * cartItem.soLuong;
    }
    return this.formatPrice(totalMoney);
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
    });
  }

  // 2
  private getCartItemsFromLocalStorage(): void {
    // subcribe cart item in localstorage quantity
    this.cartItemService.cartItemsInLocalStorageQuantity.subscribe(
      (quantity: number) => {
        this.cartItemQuantity1 = quantity;
      }
    );
    this.cartItemService.cartItemsInLocalStorage.subscribe(
      (response: CartItem[]) => {
        this.cartItems1 = response;
      }
    );

    const cartItemsInLocalStorage = localStorage.getItem("cartItems");
    if (cartItemsInLocalStorage === null) {
      const initCartItems: CartItem[] = [];
      localStorage.setItem("cartItems", JSON.stringify(initCartItems));
    }

    this.cartItemService.cartItemsInLocalStorageQuantity.next(
      JSON.parse(localStorage.getItem("cartItems")).length
    );
    this.cartItemService.cartItemsInLocalStorage.next(
      JSON.parse(localStorage.getItem("cartItems"))
    );
  }
}
