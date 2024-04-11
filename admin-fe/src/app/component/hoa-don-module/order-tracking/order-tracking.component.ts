import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HoaDonService } from "src/app/service/hoa-don.service";
import { NotificationService } from "src/app/service/notification.service";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { LichSuHoaDon } from "src/app/model/class/lich-su-hoa-don.class";
import { PdfService } from "src/app/service/pdf.service";
import Swal from "sweetalert2";

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

  constructor(
    private fb: FormBuilder,
    private hoaDonService: HoaDonService,
    private notifycation: NotificationService,
    private pdfService: PdfService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hoaDon"]) {
      this.chageTitleButton();
    }
  }

  ngOnInit() {
    // console.log(this.lichSuHoaDons);
    this.chageTitleButton();
  }
  // Bắt sự kiện next or previous
  setIsNext(value: boolean) {
    this.isNext = value;
  }
  // Thay đổi trạng thái
  changeOrderStatus() {
    console.log(this.hoaDon.trangThai);

    if (
      this.hoaDon.trangThai == "DANG_GIAO" &&
      this.isNext &&
      this.hoaDon.tongTien + this.hoaDon.phiVanChuyen - this.hoaDon.tienGiam !=
        this.hoaDonService.getTienKhachThanhToan(this.hoaDon.thanhToans)
    ) {
      // kiem tra thanh toan cua khach
      Swal.fire("Số tiền thanh toán không hợp lệ.");
      return;
    }
    this.hoaDonService
      .changeOrderStatus(
        this.hoaDon.id,
        this.changeStatusForm.value.moTa,
        this.isNext
      )
      .subscribe({
        next: (resp) => {
          // Gán lại data cho HoaDon
          this.hoaDon.lichSuHoaDons.push(resp);
          this.hoaDon.trangThai = resp.trangThai;
          this.chageTitleButton();
          this.notifycation.success("Cập nhật thành công");
          // Default in phiếu gia khi xác nhận
          if (this.hoaDon.trangThai === "DA_XAC_NHAN") {
            this.pdfService.generatePDFPhieuGiao(this.hoaDon);
          }
          this.hoaDonChange.emit(this.hoaDon);
        },
        error: (err) => {
          this.notifycation.error(err.error.message);
        },
      });
  }
  // Xử lý khi hủy đơn
  cancelOrder() {
    this.hoaDonService
      .cancelOrder(this.hoaDon.id, this.changeStatusForm.value.moTa)
      .subscribe({
        next: (resp) => {
          this.hoaDon.lichSuHoaDons.push(resp);
          this.hoaDon.trangThai = resp.trangThai;
          this.chageTitleButton();
          this.notifycation.success("Cập nhật thành công");
          this.hoaDonChange.emit(this.hoaDon);
        },
        error: (err) => {
          this.notifycation.error(err.error.message);
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
    return this.hoaDon.lichSuHoaDons.reverse();
  }
}
