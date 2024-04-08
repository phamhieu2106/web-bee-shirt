import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";

import { Discount } from "src/app/model/class/discount.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { DiscountService } from "src/app/service/discount.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-my-discounts",
  templateUrl: "./my-discounts.component.html",
  styleUrls: ["./my-discounts.component.css"],
})
export class MyDiscountsComponent {
  public discounts: Discount[] = [];

  // constructor, ngOn
  constructor(
    private currencyPipe: CurrencyPipe,
    private notifService: NotificationService,
    private discountService: DiscountService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getAllDiscounts();
  }

  // public functions
  //
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  //
  public getDiscountTitle(discount: Discount): string {
    if (discount?.kieu === 0) {
      return ` Giảm ${discount?.giaTri}% cho đơn  từ ${this.formatPrice(
        discount?.dieuKienGiam
      )} (Tối đa ${this.formatPrice(discount.giaTriMax)})`;
    } else {
      return ` Giảm ${this.formatPrice(
        discount?.giaTri
      )} cho đơn  từ ${this.formatPrice(discount?.dieuKienGiam)}`;
    }
  }

  // private functions
  private getAllDiscounts(): void {
    const loggedCust = this.authService.getCustomerFromStorage();
    this.discountService.getAllDiscountsOf1Cust(loggedCust.id).subscribe({
      next: (response: Discount[]) => {
        this.discounts = response;
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }
}
