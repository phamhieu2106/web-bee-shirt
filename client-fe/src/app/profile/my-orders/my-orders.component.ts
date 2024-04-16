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

  // constructor, ngOn
  constructor(
    private orderService: OrderService,
    private authService: AuthenticationService,
    private notifService: NotificationService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.getOrdersByStatus(this.orderStatus);
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

  // public openCity(event: MouseEvent, cityName: string): void {
  //   // Ngăn chặn sự kiện mặc định khi nhấp vào nút (nếu được gọi từ sự kiện click)
  //   if (event) {
  //     event.preventDefault();
  //   }

  //   // Ẩn tất cả các tab content
  //   const tabContents = document.getElementsByClassName("tabcontent");
  //   for (let i = 0; i < tabContents.length; i++) {
  //     const tabContent = tabContents[i] as HTMLElement;
  //     tabContent.style.display = "none";
  //   }

  //   // Xóa lớp active khỏi tất cả các tablinks
  //   const tabLinks = document.getElementsByClassName("tablinks");
  //   for (let i = 0; i < tabLinks.length; i++) {
  //     const tabLink = tabLinks[i] as HTMLElement;
  //     tabLink.classList.remove("active");
  //   }

  //   // Hiển thị tab content tương ứng với cityName
  //   const cityElement = document.getElementById(cityName);
  //   if (cityElement) {
  //     cityElement.style.display = "block";
  //   }

  //   // Thêm lớp active cho tablink tương ứng
  //   const activeTabLink = document.querySelector(
  //     `.tablinks[onclick="openCity(event, '${cityName}')"]`
  //   );
  //   if (activeTabLink) {
  //     activeTabLink.classList.add("active");
  //   }
  // }
}
