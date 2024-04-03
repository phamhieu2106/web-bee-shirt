import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";

import { Address } from "src/app/model/class/address.class";
import { CartItem } from "src/app/model/class/cart-item.class";
import { Customer } from "src/app/model/class/customer.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { AddressService } from "src/app/service/address.service";
import { AuthenticationService } from "src/app/service/authentication.service";
import { CartService } from "src/app/service/cart.service";
import { NotificationService } from "src/app/service/notification.service";
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent {
  public addresses: Address[] = [];
  public defaultAddr: Address;
  public loggedCust: Customer;
  public cartItems2: CartItem[] = [];
  public cartItemQuantity2: number;

  // constructor, ngOn
  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private router: Router,
    private notifService: NotificationService,
    private cartService: CartService,
    private productService: ProductService,
    private currencyPipe: CurrencyPipe
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

    this.loggedCust = this.authService.getCustomerFromStorage();

    this.checkLoggedIn();
    this.getAllAddressOfLoggedCust();
    this.getCartItemsFromLoggedCustomer();
  }
  // public functions
  // 1
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 2
  public calculateRealPrice(): any {
    let totalPrice = 0;
    for (const item of this.cartItems2) {
      totalPrice += item.spct.giaBan * item.soLuong;
    }
    return this.formatPrice(totalPrice);
  }

  // 3
  public calculateDiscountPrice(): any {
    let discountPrice = 0;
    return this.formatPrice(0);
  }

  // 4
  public calculateFinalPrice(): any {
    let totalPrice = 0;
    for (const item of this.cartItems2) {
      totalPrice += item.spct.giaBan * item.soLuong;
    }
    let discountPrice = 0;
    return this.formatPrice(totalPrice - discountPrice);
  }

  // private functions
  //
  private checkLoggedIn(): void {
    const isLoggedIn: boolean = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.notifService.warning("Bạn cần đăng nhập để vào được trang này!");
      this.router.navigate(["/log-in"]);
    }
  }
  //
  private getAllAddressOfLoggedCust(): void {
    this.addressService.getAllAddressOf1Customer(this.loggedCust.id).subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;
        this.defaultAddr = addresses.filter(
          (address: Address) => address.macDinh
        )[0];

        console.log(this.addresses);
        console.log(this.defaultAddr);
        console.log(this.loggedCust);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 3
  private getCartItemsFromLoggedCustomer(): void {
    const loggedCus = this.authService.getCustomerFromStorage();
    this.cartService.getCartItemsOfLoggedCustomer(loggedCus.id).subscribe({
      next: (response: CartItem[]) => {
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
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }
}
