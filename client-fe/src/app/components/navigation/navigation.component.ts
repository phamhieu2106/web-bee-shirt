import { Component } from "@angular/core";
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
import { SaleEventService } from "src/app/service/sale-event.service";
import { SaleEvent } from "src/app/model/class/sale-event.class";
import { ChatMessage } from "src/app/model/class/chat-message.class";
import { NotifService } from "src/app/service/notif.service";
import { Notification } from "src/app/model/class/notification.class";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
  public isPopupShow: boolean = false;
  public isCartShow: boolean = false;
  public isLoggedIn: boolean = false;
  public loggedCustomer: Customer;

  public cartItems1: CartItem[] = [];
  public cartItemQuantity1: number;
  public cartItems2: CartItem[] = [];
  public cartItemQuantity2: number;

  webSocket!: WebSocket;
  public notifications: Notification[] = [];

  // constructor, ngOn
  constructor(
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private authenticationService: AuthenticationService,
    private notifService: NotificationService,
    private cartService: CartService,
    private productService: ProductService,
    private saleEventService: SaleEventService,
    private notifService2: NotifService
  ) {}

  ngOnInit(): void {
    this.authenticationService.isLoggedInSubj.subscribe((value: boolean) => {
      this.isLoggedIn = value;
    });

    this.authenticationService.loggedCust.subscribe((value: Customer) => {
      this.loggedCustomer = value;
    });

    this.cartService.cartItemsOfLoggedUser.subscribe(
      (cartItems: CartItem[]) => {
        this.cartItems2 = cartItems;
      }
    );

    this.cartService.cartItemsQuantityOfLoggedUser.subscribe((data: number) => {
      this.cartItemQuantity2 = data;
    });

    this.openWebSocket();
    this.getIsLoggedInValue();
    this.getCartItemsFromLocalStorage();
    this.getCartItemsFromLoggedCustomer();
    this.getAllByCust();
  }

  openWebSocket() {
    this.webSocket = new WebSocket("ws://localhost:8080/notification");
    this.webSocket.onopen = (event) => {};
    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      let mess: ChatMessage = chatMessageDto as ChatMessage;
      this.notifService.success("Khách hàng " + mess.user + " " + mess.message);
      // this.getAllNotification();
      // this.getNotificationFalse();
      // this.chatMessages.push(chatMessageDto);
    };
    this.webSocket.onclose = (event) => {};
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
        this.router.navigate(["/log-in"]);
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
          this.deleteItemFromLocalCart(cartItem);
        } else if (type === 2) {
          this.deleteItemFromCartOfLoggedCust(cartItem);
        }
      }
    });
  }

  private deleteItemFromLocalCart(cartItem: CartItem): void {
    let cartItemsInstorage: CartItem[] = JSON.parse(
      localStorage.getItem("cartItems")
    );
    cartItemsInstorage = cartItemsInstorage.filter(
      (item: CartItem) => !(item.spct.id === cartItem.spct.id)
    );
    this.cartService.updateCartItemsInStorage(cartItemsInstorage);
    this.notifService.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
  }

  private deleteItemFromCartOfLoggedCust(cartItem: CartItem): void {
    this.cartService.deleteItemFromCart(cartItem.id).subscribe({
      next: () => {
        this.notifService.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
        const newCartItems = this.cartItems2.filter(
          (item: CartItem) => !(item.id === cartItem.id)
        );

        this.cartService.updateCartItemsOfLoggedUser(newCartItems);
        this.cartService.updateCartItemsQuantityOfLoggedUser(
          newCartItems.length
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
  public updateQuantityOfLoggedCust(cartItem: CartItem, type: string): void {
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

    this.cartService.minusOrPlusCartItemQuantity(cartItem.id, type).subscribe({
      next: (cartItem: CartItem) => {
        this.cartItems2 = this.cartItems2.map((item: CartItem) => {
          if (item.id === cartItem.id) {
            item.soLuong = cartItem.soLuong;
            return item;
          }
          return item;
        });
        this.cartService.updateCartItemsOfLoggedUser(this.cartItems2);
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
    if (!loggedCus) {
      return;
    }
    this.cartService.getCartItemsOfLoggedCustomer(loggedCus.id).subscribe({
      next: (response: CartItem[]) => {
        // get prod for prod-details
        let observables = [];
        for (let item of response) {
          observables.push(
            this.productService.getProductByProductDetails(item.spct.id)
          );
        }
        forkJoin(observables).subscribe({
          next: (productsRes: SanPham[]) => {
            productsRes.forEach((productRes, index) => {
              response[index].spct.sanPham = productRes;
              if (index === response.length - 1) {
                this.cartItems2 = response;
                this.cartItemQuantity2 = response.length;

                this.cartService.updateCartItemsOfLoggedUser(response);
                this.cartService.updateCartItemsQuantityOfLoggedUser(
                  response.length
                );
              }
            });
          },
        });

        // get sale events for prod-details
        let observables2 = [];
        for (let item of response) {
          observables2.push(
            this.saleEventService.getSaleEventOfProdDetails(item.spct.id)
          );
        }
        forkJoin(observables2).subscribe({
          next: (values: SaleEvent[]) => {
            values.forEach((v, index) => {
              response[index].spct.saleEvent = v;
              if (index === response.length - 1) {
                this.cartItems2 = response;
                this.cartItemQuantity2 = response.length;

                this.cartService.updateCartItemsOfLoggedUser(response);
                this.cartService.updateCartItemsQuantityOfLoggedUser(
                  response.length
                );
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

  //
  private getAllByCust(): void {
    this.notifService2.getAllByCust(this.loggedCustomer.id).subscribe({
      next: (notifications: Notification[]) => {
        this.notifications = notifications;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }
}
