import { CurrencyPipe } from "@angular/common";
import { Component, Input } from "@angular/core";

import { Discount } from "src/app/model/class/discount.class";

@Component({
  selector: "app-phieu-giam-gia",
  templateUrl: "./phieu-giam-gia.component.html",
  styleUrls: ["./phieu-giam-gia.component.css"],
})
export class PhieuGiamGiaComponent {
  @Input() discounts: Discount[] = [];

  // constructor, ngOn
  constructor(private currencyPipe: CurrencyPipe) {}

  // public functions
  // 1
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 2
  public getDiscountTitle(discount: Discount): string {
    if (discount?.kieu === 0) {
      return ` Giảm ${discount?.giaTri}% cho đơn  từ ${this.formatPrice(
        discount?.dieuKienGiam
      )} Tối đa ${this.formatPrice(discount.giaTriMax)}`;
    } else {
      return ` Giảm ${this.formatPrice(
        discount?.giaTri
      )} cho đơn  từ ${this.formatPrice(discount?.dieuKienGiam)}`;
    }
  }

  // 3
  public getBriefDiscountTitle(discount: Discount): string {
    if (discount?.kieu === 0) {
      return `Giảm ${discount?.giaTri}%`;
    } else {
      return ` Giảm ${this.formatPrice(discount?.giaTri)}`;
    }
  }
}
