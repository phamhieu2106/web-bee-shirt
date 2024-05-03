import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "src/app/model/class/order.class";
import { AddNotificationReq } from "src/app/model/interface/add-notifi-req.interface";

import { OnlineOrderRequest } from "src/app/model/interface/online-order-request.interface";
import { AuthenticationService } from "src/app/service/authentication.service";
import { CartService } from "src/app/service/cart.service";
import { NotifService } from "src/app/service/notif.service";
import { NotificationService } from "src/app/service/notification.service";
import { OrderService } from "src/app/service/order.service";
import { WebSocketService } from "src/app/service/web-socket.service";

@Component({
  selector: "app-vnpay-success",
  templateUrl: "./vnpay-success.component.html",
  styleUrls: ["./vnpay-success.component.css"],
})
export class VnpaySuccessComponent {
  public isLoadding = false;
  public overlayText: string = "";

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private notifService: NotificationService,
    private authService: AuthenticationService,
    private webSocketService: WebSocketService,
    private notifService2: NotifService
  ) {}

  ngOnInit() {
    this.turnOnOverlay("Vui lòng chờ...");
    this.webSocketService.openWebSocket();
    setTimeout(() => {
      this.createOrder();
    }, 5000);
  }

  private createOrder(): void {
    const req: OnlineOrderRequest = JSON.parse(
      localStorage.getItem("onlineOrderReq")
    );
    if (!req) {
      this.turnOffOverlay("");
      this.router.navigate(["/"]);
      return;
    }

    // call api
    this.orderService.placeOrderOnline(req).subscribe({
      next: (order: Order) => {
        if (req.khachHangId) {
          this.sendMessage(order);
          this.router.navigate([`/profile/order-tracking/${order.ma}`]);
          this.cartService.updateCartItemsOfLoggedUser([]);
          this.cartService.updateCartItemsQuantityOfLoggedUser(0);
          this.notifService.success(
            "Đặt hàng thành công! Cảm ơn bạn đã đặt hàng!"
          );
        } else {
          this.sendMessage2(order);
          this.router.navigate([`/tracking`]);
          this.cartService.updateCartItemsInStorage([]);
          this.cartService.updateCartItemsQuantityInStorage(0);
          this.notifService.success(
            "Đặt hàng thành công! Kiểm tra đơn hàng bằng SĐT đã đặt hàng tại đây"
          );
        }
        this.turnOffOverlay("");
        localStorage.removeItem("onlineOrderReq");
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
        this.turnOffOverlay("");
      },
    });
  }

  // private functions
  // 1
  private sendMessage(order: Order): void {
    const loggedCust = this.authService.getCustomerFromStorage();
    const newNotif: AddNotificationReq = {
      type: "NEW_ORDER_CREATED",
      content: `Bạn có đơn hàng mới từ khách hàng ${loggedCust.hoTen}!`,
      relatedUrl: `/hoa-don/chi-tiet-hoa-don/${order.id}`,
      custId: null,
    };
    this.notifService2.createNewNotification(newNotif).subscribe({
      next: (data) => {
        this.webSocketService.sendMessage("Bạn có đơn hàng mới!");
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 2
  private sendMessage2(order: Order): void {
    const newNotif: AddNotificationReq = {
      type: "NEW_ORDER_CREATED",
      content: `Bạn có đơn hàng mới!`,
      relatedUrl: `/hoa-don/chi-tiet-hoa-don/${order.id}`,
      custId: null,
    };
    this.notifService2.createNewNotification(newNotif).subscribe({
      next: (data) => {
        this.webSocketService.sendMessage("Bạn có đơn hàng mới!");
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
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
