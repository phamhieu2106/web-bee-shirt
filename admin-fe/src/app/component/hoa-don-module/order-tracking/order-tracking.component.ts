import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";

import { HoaDonService } from "src/app/service/hoa-don.service";
import { NotificationService } from "src/app/service/notification.service";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { LichSuHoaDon } from "src/app/model/class/lich-su-hoa-don.class";
import { PdfService } from "src/app/service/pdf.service";
import { Notification } from "src/app/model/class/notification.class";
import { NotifService } from "src/app/service/notif.service";
import { WebSocketService } from "src/app/service/web-socket.service";

@Component({
  selector: "app-order-tracking",
  templateUrl: "./order-tracking.component.html",
  styleUrls: ["./order-tracking.component.css"],
})
export class OrderTrackingComponent implements OnChanges {
  @Input({ required: true }) hoaDon: HoaDon;
  @Output() hoaDonChange = new EventEmitter<HoaDon>();
  public isNext = true; // check trạng thái đơn hàng (Next or Prev)
  public changeStatusForm = this.fb.group({
    moTa: [
      "Chuyển trạng thái",
      [Validators.required, Validators.minLength(10)],
    ],
  }); // form thêm LSHD
  public titleButton: string; // Đổi title button next
  public isLoadding = false;
  public overlayText = "Vui lòng chờ!";

  constructor(
    private fb: FormBuilder,
    private hoaDonService: HoaDonService,
    private pdfService: PdfService,
    private notifService2: NotifService,
    private notifService: NotificationService,
    private webSocketService: WebSocketService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hoaDon"]) {
      this.chageTitleButton();
    }
  }

  ngOnInit() {
    this.chageTitleButton();
    this.webSocketService.openWebSocket();
  }

  // Bắt sự kiện next or previous
  setIsNext(value: boolean) {
    this.isNext = value;
  }

  // Thay đổi trạng thái
  public changeOrderStatus(): void {
    if (
      this.hoaDon.trangThai == "DANG_GIAO" &&
      this.isNext &&
      this.hoaDon.tongTien + this.hoaDon.phiVanChuyen - this.hoaDon.tienGiam !=
        this.hoaDonService.getTienKhachThanhToan(this.hoaDon.thanhToans)
    ) {
      // kiem tra thanh toan cua khach
      this.notifService.error("Số tiền thanh toán không hợp lệ.");
      return;
    }
    this.turnOnOverlay("Vui lòng chờ!");
    this.hoaDonService
      .changeOrderStatus(
        this.hoaDon.id,
        this.changeStatusForm.value.moTa,
        this.isNext
      )
      .subscribe({
        next: (resp) => {
          this.turnOffOverlay("");

          // Gán lại data cho HoaDon
          this.hoaDon.lichSuHoaDons.push(resp);
          this.hoaDon.trangThai = resp.trangThai;
          this.chageTitleButton();
          this.notifService.success("Cập nhật thành công");
          // Default in phiếu gia khi xác nhận
          if (this.hoaDon.trangThai === "DA_XAC_NHAN") {
            this.pdfService.generatePDFPhieuGiao(this.hoaDon);
          }
          this.hoaDonChange.emit(this.hoaDon);

          // thông báo cho khách hàng (Hạ)
          this.sendMessage(this.hoaDon);
        },
        error: (err) => {
          this.notifService.error(err.error.message);
        },
      });
  }

  // Xử lý khi hủy đơn
  cancelOrder() {
    this.turnOnOverlay("Vui lòng chờ!");
    this.hoaDonService
      .cancelOrder(this.hoaDon.id, this.changeStatusForm.value.moTa)
      .subscribe({
        next: (resp) => {
          this.hoaDon.lichSuHoaDons.push(resp);
          this.hoaDon.trangThai = resp.trangThai;
          this.chageTitleButton();
          this.notifService.success("Cập nhật thành công");
          this.hoaDonChange.emit(this.hoaDon);
          this.turnOffOverlay("Vui lòng chờ!");
        },
        error: (err) => {
          this.notifService.error(err.error.message);
        },
      });
  }

  // Thay đổi title button
  chageTitleButton() {
    switch (this.hoaDon.trangThai) {
      case "TAO_DON":
        this.titleButton = "Chờ xác nhận";
        break;
      case "CHO_XAC_NHAN":
        this.titleButton = "Xác nhận";
        break;
      case "DA_XAC_NHAN":
        this.titleButton = "Chờ giao hàng";
        break;
      case "CHO_GIAO":
        this.titleButton = "Đang giao hàng";
        break;
      case "DANG_GIAO":
        this.titleButton = "Đã hoàn thành";
        break;
      case "HOAN_THANH":
        this.titleButton = "Đã hoàn thành";
        break;
      case "HUY":
        this.titleButton = "Đã hủy";
        break;
      default:
        this.titleButton = "Tiếp tục";
    }
  }

  getDanhSachTrangThai(): LichSuHoaDon[] {
    if (
      this.hoaDon.lichSuHoaDons == null ||
      this.hoaDon.lichSuHoaDons == undefined
    ) {
      return [];
    }
    return this.hoaDon.lichSuHoaDons.filter((lshd) => lshd.trangThai != null);
  }

  getLichSuHoaDonsOrderByCreatedDate() {
    return this?.hoaDon?.lichSuHoaDons?.reverse();
  }

  // private functions
  private sendMessage(order: HoaDon): void {
    const newNotif = new Notification(
      "ORDER_STATUS_UPDATED",
      `Hóa đơn ${order.ma} đã được cập nhật trạng thái!`,
      `/profile/order-tracking/${order.ma}`,
      order?.khachHang?.id
    );
    this.notifService2.createNewNotification(newNotif).subscribe({
      next: (data) => {
        this.webSocketService.sendMessage(
          `Hóa đơn ${order.ma} đã được cập nhật trạng thái`
        );
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }

  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  private turnOffOverlay(text: string): void {
    this.overlayText = "";
    this.isLoadding = false;
  }
}
