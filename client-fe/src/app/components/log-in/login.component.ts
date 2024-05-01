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
import { TestService } from "src/app/service/test.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public isLoading: boolean;
  public loginForm: FormGroup;
  public isPassInputHidden = true;

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
  public togglePasswordInput(): void {
    this.isPassInputHidden = !this.isPassInputHidden;
  }

  // 2
  public login(): void {
    if (
      this.loginForm.get("phone").hasError("required") ||
      this.loginForm.get("password").hasError("required")
    ) {
      this.notifService.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (this.loginForm.get("phone").hasError("pattern")) {
      this.notifService.error("Số điện thoại không hợp lệ!");
      return;
    }

    this.authenticationService.login(this.loginForm.value).subscribe({
      // - login succeed => lấy token từ server, lưu token và object: customer vào localStorage
      next: (response: HttpResponse<Customer>) => {
        const token = response.headers.get("Jwt-Token");
        const loggedCust = response.body;

        this.notifService.success("Đăng nhập thành công!");
        this.authenticationService.updateIsLoggedInSubj(true);
        this.authenticationService.updateLoggedCust(response.body);

        this.authenticationService.saveTokenToStorage(token);
        this.authenticationService.saveCustomerToStorage(loggedCust);

        // lấy lại danh sách cart-item
        this.cartService.getCartItemsOfLoggedCustomer(loggedCust.id).subscribe({
          next: (newCartItems: CartItem[]) => {
            // sau khi đã lấy hết cart-item, ta vẫn phải gán sp cho spct của từng cart-item
            let getProdObservables = [];
            for (let item of newCartItems) {
              getProdObservables.push(
                this.productService.getProductByProductDetails(item.spct.id)
              );
            }

            if (getProdObservables.length > 0) {
              forkJoin(getProdObservables).subscribe({
                next: (products: SanPham[]) => {
                  products.forEach((product, index) => {
                    newCartItems[index].spct.sanPham = product;
                    if (index === newCartItems.length - 1) {
                      this.cartService.updateCartItemsOfLoggedUser(
                        newCartItems
                      );
                      this.cartService.updateCartItemsQuantityOfLoggedUser(
                        newCartItems.length
                      );
                      this.router.navigate(["/"]);
                    }
                  });
                },
              });
            } else {
              this.router.navigate(["/"]);
            }
          },
        });
      },
      error: (errRes: HttpErrorResponse) => {
        if (errRes.error.message === "Bad credentials") {
          this.notifService.error(
            "Số điện thoại hoặc mật khẩu của bạn không đúng hoặc chưa tồn tại trong hệ thống!"
          );
        } else if (errRes.error.message === "User is disabled") {
          this.notifService.error("Tài khoản của bạn đã bị khóa!");
        }
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
      phone: new FormControl("0807760922", [
        Validators.required,
        Validators.pattern("^(0[1-9][0-9]{8})$"),
      ]),
      password: new FormControl("A1234567", [Validators.required]),
    });
  }
}
