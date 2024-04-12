import { Component, Inject } from "@angular/core";
import { NZ_MODAL_DATA, NzModalRef } from "ng-zorro-antd/modal";

@Component({
  selector: "app-quantity-input",
  templateUrl: "./quantity-input.component.html",
  styleUrls: ["./quantity-input.component.css"],
})
export class QuantityInputComponent {
  quantity: number;
  maxQuantity: number;
  constructor() {}
  ngOnchanges() {}
  ngOnInit(): void {}

  public checkMaxQuantity(quantiy: any): void {
    if (quantiy == null) {
      this.quantity = 1;
    } else if (quantiy > this.maxQuantity) {
      this.quantity = this.maxQuantity;
    } else if (quantiy <= 0) {
      this.quantity = this.maxQuantity;
    }
  }
}
