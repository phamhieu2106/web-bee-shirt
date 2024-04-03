import { Component, EventEmitter, Output } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";

import Swal, { SweetAlertResult } from "sweetalert2";

import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { NotificationService } from "src/app/service/notification.service";
import { CartItem } from "src/app/model/class/cart-item.class";
import { CartService } from "src/app/service/cart.service";
import { ProductService } from "src/app/service/product.service";
import { forkJoin } from "rxjs";
import { SanPham } from "src/app/model/class/san-pham.class";
import { Cart } from "src/app/model/class/cart.class";

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
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemsOfLoggedUser.subscribe(
      (cartItems: CartItem[]) => {
        this.cartItems2 = cartItems;
      }
    );

    this.cartService.cartItemsQuantityOfLoggedUser.subscribe((data: number) => {
      this.cartItemQuantity2 = data;
    });

    this.getIsLoggedInValue();
    this.getCartItemsFromLocalStorage();
    this.getCartItemsFromLoggedCustomer();
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
    // this.getCartItemsFromLoggedCustomer();
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
  public updateQuantity1(cartItem: CartItem, type: string): void {
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
    this.cartService.updateCartItemsInStorage(cartItemsInstorage);
  }

  // 7
  public deleteItemFromCart(cartItem: CartItem, type: number): void {
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
        if (type === 1) {
          this.deleteItemFromCart1(cartItem);
        } else if (type === 2) {
          this.deleteItemFromCart2(cartItem);
        }
      }
    });
  }

  private deleteItemFromCart1(cartItem: CartItem): void {
    let cartItemsInstorage: CartItem[] = JSON.parse(
      localStorage.getItem("cartItems")
    );
    cartItemsInstorage = cartItemsInstorage.filter(
      (item: CartItem) => !(item.spct.id === cartItem.spct.id)
    );
    this.cartService.updateCartItemsInStorage(cartItemsInstorage);
    this.notifService.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
  }

  private deleteItemFromCart2(cartItem: CartItem): void {
    this.cartService.deleteItemFromCart(cartItem.id).subscribe({
      next: () => {
        this.notifService.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
        this.cartItems2 = this.cartItems2.filter(
          (item: CartItem) => !(item.id === cartItem.id)
        );
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }

  // 8
  public calculateTotalMoney(cartItems: CartItem[]): string {
    let totalMoney: number = 0;

    for (const cartItem of cartItems) {
      totalMoney += cartItem.spct.giaBan * cartItem.soLuong;
    }
    return this.formatPrice(totalMoney);
  }

  // 9
  public updateQuantity2(cartItem: CartItem, type: string): void {
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

    this.cartService.updateCartItemQuantity(cartItem.id, type).subscribe({
      next: (cartItem: CartItem) => {
        this.cartItems2 = this.cartItems2.map((item: CartItem) => {
          if (item.id === cartItem.id) {
            item.soLuong = cartItem.soLuong;
            return item;
          }
          return item;
        });
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }

  // private functions
  // 1
  private getIsLoggedInValue(): void {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loggedCustomer = this.authenticationService.getCustomerFromStorage();
    }
  }

  // 2
  private getCartItemsFromLocalStorage(): void {
    // subcribe cart item in localstorage
    this.cartService.cartItemsQuantityInLocalStorage.subscribe(
      (quantity: number) => {
        this.cartItemQuantity1 = quantity;
      }
    );
    this.cartService.cartItemsInLocalStorage.subscribe(
      (response: CartItem[]) => {
        this.cartItems1 = response;
      }
    );

    const cartItemsInLocalStorage = localStorage.getItem("cartItems");
    if (cartItemsInLocalStorage === null) {
      const initCartItems: CartItem[] = [];
      localStorage.setItem("cartItems", JSON.stringify(initCartItems));
    }

    this.cartService.cartItemsQuantityInLocalStorage.next(
      JSON.parse(localStorage.getItem("cartItems")).length
    );
    this.cartService.cartItemsInLocalStorage.next(
      JSON.parse(localStorage.getItem("cartItems"))
    );
  }

  // 3
  private getCartItemsFromLoggedCustomer(): void {
    const loggedCus = this.authenticationService.getCustomerFromStorage();
    this.cartService.getCartItemsOfLoggedCustomer(loggedCus.id).subscribe({
      next: (response: CartItem[]) => {
        let observables = [];
        for (let item of response) {
          observables.push(
            this.productService.getProductByProductDetailsId(item.spct.id)
          );
        }
        forkJoin(observables).subscribe({
          next: (productsRes: SanPham[]) => {
            productsRes.forEach((productRes, index) => {
              response[index].spct.sanPham = productRes;
              if (index === response.length - 1) {
                this.cartItems2 = response;
                this.cartItemQuantity2 = response.length;
                this.cartService.updateCartItems(response);
                this.cartService.updateCartItemsQuantity(response.length);
              }
            });
          },
        });
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }
}
