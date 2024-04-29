import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderDetails } from "src/app/model/class/order-details.class";
import { OrderHistory } from "src/app/model/class/order-history.class";

import { Order } from "src/app/model/class/order.class";
import { NotificationService } from "src/app/service/notification.service";
import { OrderService } from "src/app/service/order.service";

@Component({
  selector: "app-order-tracking",
  templateUrl: "./order-tracking.component.html",
  styleUrls: ["./order-tracking.component.css"],
})
export class OrderTrackingComponent {
  public order: Order;
  public totalSalePrice: number = 0;
  private webSocket!: WebSocket;

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private notifService: NotificationService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getOrderByCode();
    this.openWebSocket();
  }

  // public functions
  // 1
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 2
  public getOrderStatusIcon(orderHistory: OrderHistory): string {
    if (orderHistory.trangThai === "CHO_XAC_NHAN") {
      return "fa-solid fa-exclamation";
    } else if (orderHistory.trangThai === "DA_XAC_NHAN") {
      return "fa-solid fa-check";
    } else if (orderHistory.trangThai === "CHO_GIAO") {
      return "fa-solid fa-clock";
    } else if (orderHistory.trangThai === "DANG_GIAO") {
      return "fa-solid fa-truck-fast";
    } else if (orderHistory.trangThai === "HOAN_THANH") {
      return "fa-solid fa-credit-card";
    }
    return "";
  }

  // 3
  public getOrderStatus(orderStatus: string): string {
    if (orderStatus === "CHO_XAC_NHAN") {
      return "Chờ xác nhận";
    } else if (orderStatus === "DA_XAC_NHAN") {
      return "Đã xác nhận";
    } else if (orderStatus === "CHO_GIAO") {
      return "Chờ giao";
    } else if (orderStatus === "DANG_GIAO") {
      return "Đang giao";
    } else if (orderStatus === "HOAN_THANH") {
      return "Hoàn thành";
    }
    return "";
  }

  // private functions
  // 1
  private getOrderByCode(): void {
    this.activatedRoute.params.subscribe((params) => {
      let orderCode = params["orderCode"];

      // 1.1 get order
      this.orderService.getByCode(orderCode).subscribe({
        next: (order: Order) => {
          this.order = order;

          //
          for (let od of this.order.hoaDonChiTiets) {
            if (od.sanPhamChiTiet.giaBan !== od.giaBan) {
              this.totalSalePrice +=
                (od.sanPhamChiTiet.giaBan - od.giaBan) * od.soLuong;
            }
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
    });
  }

  // 2
  private openWebSocket(): void {
    this.webSocket = new WebSocket("ws://localhost:8080/notification");
    this.webSocket.onopen = (event) => {};
    this.webSocket.onmessage = (event) => {
      this.notifService.success((event.data as string).replaceAll(/"/, ""));
      this.getOrderByCode();
    };
    this.webSocket.onclose = (event) => {};
  }
}
