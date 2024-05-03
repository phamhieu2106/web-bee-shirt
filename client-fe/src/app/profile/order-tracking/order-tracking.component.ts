import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import Swal, { SweetAlertResult } from "sweetalert2";

import { OrderHistory } from "src/app/model/class/order-history.class";
import { Order } from "src/app/model/class/order.class";
import { ChangeOrderStatusReq } from "src/app/model/interface/change-order-status-req.interface";
import { NotificationService } from "src/app/service/notification.service";
import { OrderService } from "src/app/service/order.service";
import { Payment } from "src/app/model/class/payment.class";
import { AddNotificationReq } from "src/app/model/interface/add-notifi-req.interface";
import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { NotifService } from "src/app/service/notif.service";
import { WebSocketService } from "src/app/service/web-socket.service";

@Component({
  selector: "app-order-tracking",
  templateUrl: "./order-tracking.component.html",
  styleUrls: ["./order-tracking.component.css"],
})
export class OrderTrackingComponent {
  public loggedCust: Customer;
  public order: Order;
  public totalSalePrice: number = 0;
  private webSocket!: WebSocket;
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
  public isLoadding = false;
  public overlayText: string = "";

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private notifService: NotificationService,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private notifService2: NotifService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.openWebSocket();
    this.loggedCust = this.authService.getCustomerFromStorage();
    this.getOrderByCode();
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
  public filterOrderHistory(orderHistory: OrderHistory[]): OrderHistory[] {
    return orderHistory?.filter((oh: OrderHistory) =>
      this.orderStatusList.includes(oh.trangThai)
    );
  }

  // 5
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
          idHoaDon: this.order.id,
          moTa: "123p1jppwkdpoakdsd",
          isNext: false,
        };
        this.orderService.cancelOrder(req).subscribe({
          next: () => {
            this.notifService.success("Hủy đơn hàng thành công!");
            this.getOrderByCode();
            this.sendMessage();
            this.turnOffOverlay("");
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
            this.turnOffOverlay("");
          },
        });
      }
    });
  }

  private sendMessage(): void {
    const newNotif: AddNotificationReq = {
      type: "CANCEL_ORDER",
      content: `Khách hàng ${this.loggedCust.hoTen} đã hủy đơn hàng!`,
      relatedUrl: `/hoa-don/chi-tiet-hoa-don/${this.order.id}`,
      custId: null,
    };
    this.notifService2.createNewNotification(newNotif).subscribe({
      next: (data) => {
        this.webSocketService.sendMessage(
          `Khách hàng ${this.loggedCust.hoTen} đã hủy đơn hàng!`
        );
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  public checkPaymentMethod(order: Order): string {
    if (
      order?.thanhToans.some(
        (p: Payment) => p.hinhThucThanhToan.hinhThuc === "CHUYEN_KHOAN"
      )
    ) {
      return "VNPAY";
    } else if (
      order?.thanhToans.some(
        (p: Payment) => p.hinhThucThanhToan.hinhThuc === "TIEN_MAT"
      ) ||
      order?.thanhToans.length === 0
    ) {
      return "TIEN_MAT";
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
        error: (errResp: HttpErrorResponse) => {
          this.notifService.error(errResp.error.message);
        },
      });
    });
  }

  // 2
  private openWebSocket(): void {
    this.webSocket = new WebSocket("ws://localhost:8080/notification");
    this.webSocket.onopen = (event) => {};
    this.webSocket.onmessage = (event) => {
      this.getOrderByCode();
      this.notifService.success(event.data as string);
    };
    this.webSocket.onclose = (event) => {};
  }

  // 3
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 4
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
