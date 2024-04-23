import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { OrderHistory } from "src/app/model/class/order-history.class";

import { Order } from "src/app/model/class/order.class";
import { NotificationService } from "src/app/service/notification.service";
import { OrderService } from "src/app/service/order.service";

@Component({
  selector: "app-tracking",
  templateUrl: "./tracking.component.html",
  styleUrls: ["./tracking.component.css"],
})
export class TrackingComponent {
  public modes: boolean[] = [true, false, false];

  public isLoadding = false;
  public overlayText: string = "";

  public phoneOrder: string = "0921829101";
  public orders: Order[] = [];
  public selectedOrder: Order;

  // constructor, ngOn
  constructor(
    private orderService: OrderService,
    private notifService: NotificationService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {}

  // public functions
  // 1
  public getOrdersByPhone(): void {
    this.phoneOrder = this.phoneOrder.trim();

    if (!this.phoneOrder) {
      this.notifService.warning("Vui lòng nhập SĐT!");
      return;
    }

    if (!this.phoneOrder.match("^(0[1-9][0-9]{8})$")) {
      this.notifService.warning("Số điện thoại không hợp lệ!");
      return;
    }

    this.turnOnOverlay("Hệ thống đang xử lý...");
    setTimeout(() => {
      this.orderService.getNoneLoggedOrdersByPhone(this.phoneOrder).subscribe({
        next: (orders: Order[]) => {
          this.orders = orders;
          if (this.orders.length > 0) {
            this.changeMode(1);
          } else {
            this.notifService.warning(
              "Không tìm thấy đơn hàng nào với SĐT này!"
            );
          }
          this.turnOffOverlay("");
        },
        error: (errRes: HttpErrorResponse) => {
          this.notifService.error(errRes.error.message);
          this.turnOffOverlay("");
        },
      });
    }, 1000);
  }

  // 2
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
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

  // 4
  public viewOrderDetails(orderCode: string): void {
    this.orderService.getByCode(orderCode).subscribe({
      next: (order: Order) => {
        this.selectedOrder = order;
        this.changeMode(2);
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }

  // 5
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

  // 6
  public changeMode(mode: number): void {
    for (let i = 0; i < this.modes.length; ++i) {
      this.modes[i] = mode === i ? true : false;
    }
  }

  // private functions
  // 1
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 2
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
