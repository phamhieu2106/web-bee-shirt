import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { CartItem } from "src/app/model/class/cart-item.class";

import { Customer } from "src/app/model/class/customer.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { CartService } from "src/app/service/cart.service";
import { NotificationService } from "src/app/service/notification.service";
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public loading: boolean;
  public loginForm: FormGroup;
  public passwordInputType = true;

  // constructor, ngOn
  constructor(
    private router: Router,
    private notifService: NotificationService,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    this.initFormLogin();
  }

  // public functions
  // 1
  public togglePasswordInputType(): void {
    this.passwordInputType = !this.passwordInputType;
  }

  // 2
  public login(): void {
    this.authenticationService.login(this.loginForm.value).subscribe({
      // - login succeed => lấy token từ server, lưu token và object: customer vào localStorage
      next: (response: HttpResponse<Customer>) => {
        const token = response.headers.get("Jwt-Token");
        this.authenticationService.saveTokenToStorage(token);
        this.authenticationService.saveCustomerToStorage(response.body);

        this.notifService.success("Đăng nhập thành công!");
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 1000);

        // get cart items of logged customers
        this.cartService
          .getCartItemsOfLoggedCustomer(
            this.authenticationService.getCustomerFromStorage().id
          )
          .subscribe({
            next: (response: CartItem[]) => {
              const observables = [];
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
                      this.cartService.updateCartItems(response);
                      this.cartService.updateCartItemsQuantity(response.length);
                      this.router.navigate(["/"]);
                    }
                  });
                },
              });
            },
          });
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // private functions
  // 1
  private checkLogin(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.notifService.warning("Bạn cần đăng xuất để đến trang đăng nhập!");
      this.router.navigate(["/"]);
    }
  }

  // 2
  private initFormLogin(): void {
    this.loginForm = new FormGroup({
      tenDangNhap: new FormControl("0807760922", [Validators.required]),
      matKhau: new FormControl("fjJgF", [Validators.required]),
    });
  }
}
