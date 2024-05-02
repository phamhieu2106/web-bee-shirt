import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { OrderHistory } from "src/app/model/class/order-history.class";

import { Order } from "src/app/model/class/order.class";
import { Payment } from "src/app/model/class/payment.class";
import { AddNotificationReq } from "src/app/model/interface/add-notifi-req.interface";
import { ChangeOrderStatusReq } from "src/app/model/interface/change-order-status-req.interface";
import { NotifService } from "src/app/service/notif.service";
import { NotificationService } from "src/app/service/notification.service";
import { OrderService } from "src/app/service/order.service";
import { WebSocketService } from "src/app/service/web-socket.service";
import Swal, { SweetAlertResult } from "sweetalert2";

@Component({
  selector: "app-tracking",
  templateUrl: "./tracking.component.html",
  styleUrls: ["./tracking.component.css"],
})
export class TrackingComponent {
  public modes: boolean[] = [true, false, false];

  public isLoadding = false;
  public overlayText: string = "";

  public phoneOrder: string = "";
  public orders: Order[] = [];
  public selectedOrder: Order;

  public orderStatusList = [
    "CHO_XAC_NHAN",
    "DA_XAC_NHAN",
    "CHO_GIAO",
    "DANG_GIAO",
    "HOAN_THANH",
    "HUY",
    "TRA_HANG",
    "CHO_HOAN_TIEN",
    "DA_HOAN_TIEN",
  ];

  // constructor, ngOn
  constructor(
    private orderService: OrderService,
    private notifService: NotificationService,
    private currencyPipe: CurrencyPipe,
    private notifService2: NotifService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

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
    } else if (orderHistory.trangThai === "HUY") {
      return "fa-solid fa-ban";
    } else if (orderHistory.trangThai === "TRA_HANG") {
      return "fa-solid fa-rotate-left";
    } else if (orderHistory.trangThai === "CHO_HOAN_TIEN") {
      return "fa-solid fa-comment-dollar";
    } else if (orderHistory.trangThai === "DA_HOAN_TIEN") {
      return "fa-solid fa-money-bill-transfer";
    }
    return "";
  }

  // 6
  public changeMode(mode: number): void {
    for (let i = 0; i < this.modes.length; ++i) {
      this.modes[i] = mode === i ? true : false;
    }
  }

  // 7
  public cancelOrder(): void {
    Swal.fire({
      title: "Hủy đơn hàng?",
      cancelButtonText: "Cancel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.turnOnOverlay("Vui lòng chờ!");
        const req: ChangeOrderStatusReq = {
          idHoaDon: this.selectedOrder.id,
          moTa: "123p1jppwkdpoakdsd",
          isNext: false,
        };
        this.orderService.cancelOrder(req).subscribe({
          next: () => {
            this.notifService.success("Hủy đơn hàng thành công!");
            // this.getOrderByCode();
            this.turnOffOverlay("");
            this.sendMessage(this.selectedOrder.id);
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
            this.turnOffOverlay("");
          },
        });
      }
    });
  }

  private sendMessage(orderId: number): void {
    const newNotif: AddNotificationReq = {
      type: "CANCEL_ORDER",
      content: `Một khách hàng đã hủy đơn hàng!`,
      relatedUrl: `/hoa-don/chi-tiet-hoa-don/${orderId}`,
      custId: null,
    };
    this.notifService2.createNewNotification(newNotif).subscribe({
      next: (data) => {
        this.webSocketService.sendMessage("Một khách hàng đã hủy đơn hàng!");
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  //
  public filterOrderHistory(orderHistory: OrderHistory[]): OrderHistory[] {
    return orderHistory?.filter((oh: OrderHistory) =>
      this.orderStatusList.includes(oh.trangThai)
    );
  }

  public checkPaymentMethod(order: Order): string {
    if (
      order.thanhToans.some(
        (p: Payment) => p.hinhThucThanhToan.hinhThuc === "CHUYEN_KHOAN"
      )
    ) {
      return "VNPAY";
    } else if (
      order.thanhToans.some(
        (p: Payment) => p.hinhThucThanhToan.hinhThuc === "TIEN_MAT"
      ) ||
      order.thanhToans.length === 0
    ) {
      return "TIEN_MAT";
    }
    return "";
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
