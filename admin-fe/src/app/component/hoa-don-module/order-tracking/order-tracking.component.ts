import { ToastrService } from "ngx-toastr";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HoaDonService } from "src/app/service/hoa-don.service";
import { LichSuHoaDon } from "src/app/model/class/lich-su-hoa-don.class";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { NotificationService } from "src/app/service/notification.service";
import { ThanhToan } from "src/app/model/class/thanh-toan";
import { HoaDon } from "src/app/model/class/hoa-don.class";

@Component({
  selector: "app-order-tracking",
  templateUrl: "./order-tracking.component.html",
  styleUrls: ["./order-tracking.component.css"],
})
export class OrderTrackingComponent {
  // @Input({ required: true }) lichSuHoaDons: LichSuHoaDon[]; // danh sách ls hóa đơn
  // @Input({ required: true }) idHoaDon: number; // id hóa đơn của LSHD cần cập nhật (Next trạng thái, Prev trạng thái)
  // @Input({ required: true }) trangThaiHD: string; // trang thai hiện tại của hóa đơn
  // @Output() trangThaiHDChange = new EventEmitter<string>(); // trang thai hiện tại của hóa đơn
  // @Input({ required: true }) loaiHD: string; // Loại hóa đơn GIAO_HANG hoặc TAI_QUAY (Check in phiếu giao)
  // @Input({ required: true }) ma: string; // Mã hd để lấy thông tin phiếu giao
  // @Input({ required: true }) thanhToans: ThanhToan[]; // Mã hd để lấy thông tin phiếu giao
  // @Input({ required: true }) tongTien: number; // Mã hd để lấy thông tin phiếu giao
  @Input({ required: true }) hoaDon: HoaDon; // id hóa đơn cần tạo thanh toán
  @Output() hoaDonChange = new EventEmitter<HoaDon>(); // id hóa đơn cần tạo thanh toán
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
    private notifycation: NotificationService
  ) {}

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
    // if (this.trangThaiHD == "DANG_GIAO_HANG") {
    // }
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
            // this.inPhieuGiao();
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
}
