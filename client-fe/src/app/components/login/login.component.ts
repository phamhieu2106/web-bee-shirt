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
    this.authenticationService.login(this.loginForm.value).subscribe({
      // - login succeed => lấy token từ server, lưu token và object: customer vào localStorage
      next: (response: HttpResponse<Customer>) => {
        const token = response.headers.get("Jwt-Token");
        const loggedCust = response.body;

        this.authenticationService.saveTokenToStorage(token);
        this.authenticationService.saveCustomerToStorage(loggedCust);

        this.notifService.success("Đăng nhập thành công!");
        this.authenticationService.updateisLoggedInSubj(true);

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

            forkJoin(getProdObservables).subscribe({
              next: (products: SanPham[]) => {
                products.forEach((product, index) => {
                  newCartItems[index].spct.sanPham = product;
                  if (index === newCartItems.length - 1) {
                    this.cartService.updateCartItemsOfLoggedUser(newCartItems);
                    this.cartService.updateCartItemsQuantityOfLoggedUser(
                      newCartItems.length
                    );
                    this.router.navigate(["/"]);
                  }
                });
              },
            });
          },
        });
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
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
