import { ToastrService } from "ngx-toastr";
import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HoaDonService } from "src/app/service/hoa-don.service";
import { TrangThaiHoaDon } from "src/app/model/enum/TrangThaiHoaDon";

@Component({
  selector: "app-order-tracking",
  templateUrl: "./order-tracking.component.html",
  styleUrls: ["./order-tracking.component.css"],
})
export class OrderTrackingComponent {
  @Input() lichSuHoaDons: any; // danh sách ls hóa đơn
  @Input() idHoaDon: number; // id hóa đơn cần cập nhật
  @Input() trangThaiHD: string; // trang thai hiện tại của hóa đơn
  public isNext = true; // trạng thái đơn hàng tiếp theo
  public changeStatusForm = this.fb.group({
    moTa: ["", [Validators.required, Validators.minLength(10)]],
  }); // form
  public titleButton: string;

  constructor(
    private fb: FormBuilder,
    private hoaDonService: HoaDonService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // console.log(this.lichSuHoaDons);
    this.chageTitleButton();
  }

  setIsNext(value: boolean) {
    this.isNext = value;
  }

  changeOrderStatus() {
    this.hoaDonService
      .changeOrderStatus(
        this.idHoaDon,
        this.changeStatusForm.value.moTa,
        this.isNext
      )
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

  chageTitleButton() {
    switch (this.trangThaiHD) {
      case "TAO_DON":
        this.titleButton = "Xác nhận";
        break;
      case "CHO_XAC_NHAN":
        this.titleButton = "Đã xác nhận";
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
