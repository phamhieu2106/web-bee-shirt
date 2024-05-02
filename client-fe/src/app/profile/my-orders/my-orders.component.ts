import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";

import { Order } from "src/app/model/class/order.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { NotificationService } from "src/app/service/notification.service";
import { OrderService } from "src/app/service/order.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"],
})
export class MyOrdersComponent {
  public orderStatus: string = "ALL";
  public orders: Order[] = [];
  private webSocket!: WebSocket;

  // constructor, ngOn
  constructor(
    private orderService: OrderService,
    private authService: AuthenticationService,
    private notifService: NotificationService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.getOrdersByStatus(this.orderStatus);
    this.openWebSocket();
  }

  // public functions
  // 1
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 2
  public formatOrderStatus(orderStatus: string): string {
    if (orderStatus === "CHO_XAC_NHAN") {
      return "Chờ xác nhận";
    } else if (orderStatus === "DA_XAC_NHAN") {
      return "Đã xác nhận";
    } else if (orderStatus === "CHO_GIAO") {
      return "Chờ giao hàng";
    } else if (orderStatus === "DANG_GIAO") {
      return "Đang giao hàng";
    } else if (orderStatus === "HOAN_THANH") {
      return "Hoàn thành";
    } else if (orderStatus === "HUY") {
      return "Hủy";
    } else if (orderStatus === "TRA_HANG") {
      return "Trả hàng";
    } else if (orderStatus === "CHO_HOAN_TIEN") {
      return "Chờ hoàn tiền";
    } else if (orderStatus === "DA_HOAN_TIEN") {
      return "Đã hoàn tiền";
    }

    return "";
  }

  // 3
  public getClassByOrderStatus(orderStatus: string): string {
    if (orderStatus === "CHO_XAC_NHAN") {
      return "btn rounded order-cho-xac-nhan";
    } else if (orderStatus === "DA_XAC_NHAN") {
      return "btn rounded order-da-xac-nhan";
    } else if (orderStatus === "CHO_GIAO") {
      return "btn rounded order-cho-giao";
    } else if (orderStatus === "DANG_GIAO") {
      return "btn rounded order-dang-giao";
    } else if (orderStatus === "HOAN_THANH") {
      return "btn rounded order-hoan-thanh";
    } else if (orderStatus === "HUY") {
      return "btn rounded order-huy";
    } else if (orderStatus === "TRA_HANG") {
      return "fa-solid fa-rotate-left";
    } else if (orderStatus === "CHO_HOAN_TIEN") {
      return "fa-solid fa-comment-dollar";
    } else if (orderStatus === "DA_HOAN_TIEN") {
      return "fa-solid fa-money-bill-transfer";
    }
    return "";
  }

  //
  public getOrdersByStatus(status: string): void {
    const loggedCust = this.authService.getCustomerFromStorage();
    this.orderStatus = status;
    this.orderService
      .getOrdersForClient(loggedCust.id, this.orderStatus)
      .subscribe({
        next: (orders: Order[]) => {
          this.orders = orders;
        },
        error: (errRes: HttpErrorResponse) => {
          this.notifService.error(errRes.error.message);
        },
      });
  }

  // private functions
  // 1
  private openWebSocket(): void {
    this.webSocket = new WebSocket("ws://localhost:8080/notification");
    this.webSocket.onopen = (event) => {};
    this.webSocket.onmessage = (event) => {
      this.getOrdersByStatus(this.orderStatus);
    };
    this.webSocket.onclose = (event) => {};
  }
}
