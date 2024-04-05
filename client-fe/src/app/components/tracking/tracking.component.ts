import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Order } from "src/app/model/class/order.class";
import { NotificationService } from "src/app/service/notification.service";
import { OrderService } from "src/app/service/order.service";

@Component({
  selector: "app-tracking",
  templateUrl: "./tracking.component.html",
  styleUrls: ["./tracking.component.css"],
})
export class TrackingComponent {
  public order: Order;

  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private notifService: NotificationService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getProductByCode();
  }

  // private functions
  private getProductByCode(): void {
    this.activatedRoute.params.subscribe((params) => {
      let orderCode = params["orderCode"];

      // 1.1 get order
      this.orderService.getByCode(orderCode).subscribe({
        next: (order: Order) => {
          this.order = order;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
    });
  }
}
