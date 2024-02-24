import { ToastrService } from "ngx-toastr";
import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HoaDonService } from "src/app/service/hoa-don.service";
import { LichSuHoaDon } from "src/app/model/class/lich-su-hoa-don.class";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";

@Component({
  selector: "app-order-tracking",
  templateUrl: "./order-tracking.component.html",
  styleUrls: ["./order-tracking.component.css"],
})
export class OrderTrackingComponent {
  @Input({ required: true }) lichSuHoaDons: LichSuHoaDon[]; // danh sách ls hóa đơn
  @Input({ required: true }) idHoaDon: number; // id hóa đơn của LSHD cần cập nhật (Next trạng thái, Prev trạng thái)
  @Input({ required: true }) trangThaiHD: string; // trang thai hiện tại của hóa đơn
  @Input({ required: true }) loaiHD: string; // Loại hóa đơn GIAO_HANG hoặc TAI_QUAY (Check in phiếu giao)
  @Input({ required: true }) ma: string; // Mã hd để lấy thông tin phiếu giao
  public isNext = true; // check trạng thái đơn hàng (Next or Prev)
  public changeStatusForm = this.fb.group({
    moTa: ["", [Validators.required, Validators.minLength(10)]],
  }); // form thêm LSHD
  public titleButton: string; // Đổi title button next

  constructor(
    private fb: FormBuilder,
    private hoaDonService: HoaDonService,
    private giaoHangNhanhService: GiaoHangNhanhService,
    private toastr: ToastrService
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
    this.hoaDonService
      .changeOrderStatus(
        this.idHoaDon,
        this.changeStatusForm.value.moTa,
        this.isNext
      )
      .subscribe({
        next: (resp) => {
          // Gán lại data cho HoaDon
          this.lichSuHoaDons.push(resp);
          this.trangThaiHD = resp.trangThai;
          this.chageTitleButton();
          this.toastr.success("Cập nhật thành công", "Thành công");
          // Default in phiếu gia khi xác nhận
          if (this.trangThaiHD === "DA_XAC_NHAN") {
            this.inPhieuGiao();
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message, "Thất bại");
        },
      });
  }
  // Xử lý khi hủy đơn
  cancelOrder() {
    this.hoaDonService
      .cancelOrder(this.idHoaDon, this.changeStatusForm.value.moTa)
      .subscribe({
        next: (resp) => {
          this.lichSuHoaDons.push(resp);
          this.trangThaiHD = resp.trangThai;
          this.chageTitleButton();
          this.toastr.success("Cập nhật thành công", "Thành công");
        },
        error: (err) => {
          this.toastr.error(err.error.message, "Thất bại");
        },
      });
  }
  // Thay đổi title button
  chageTitleButton() {
    switch (this.trangThaiHD) {
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

  inPhieuGiao() {
    let order_code = "LF7AAF";
    // get mã đơn hàng trên hệ thống
    // this.giaoHangNhanhService
    //   .getOrderInforByClientOrderCode(this.ma)
    //   .subscribe({
    //     next: (resp) => {
    //       order_code = resp.data.order_code;
    //     },
    //   });

    this.giaoHangNhanhService.getTokenPhieuGiaoHang(order_code).subscribe({
      next: (resp) => {
        console.log(resp);
        window.open(
          "https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=" +
            resp.data.token
        );
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Tạo phiếu thất bại");
      },
    });
  }
}
