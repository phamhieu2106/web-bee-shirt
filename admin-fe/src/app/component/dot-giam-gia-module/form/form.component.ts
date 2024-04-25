import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";
import { NotificationService } from "src/app/service/notification.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  public overlayText: string = "";
  public isLoadding = false;
  @Input() modalTitle: string;
  @Input() modalMessage: string;
  @Input() modalAction: string;
  @Input() formHeader: string;
  @Input() formButton: string;
  @Input() typeForm: string;
  // list product
  @Input() listProduct: Array<number>;

  // DotGiamGia Request
  @Input() dotGiamGiaRequest?: DotGiamGia;

  public form: any;

  constructor(
    private service: DotGiamGiaService,
    private toast: ToastrService,
    private router: Router,
    private notifService: NotificationService
  ) {
    setTimeout(() => {
      this.patchForm();
    }, 300);
  }
  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.form = new FormGroup({
      tenDotGiamGia: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[\p{L}0-9])[\p{L}0-9\s\/]*$/u),
      ]),
      giaTriPhanTram: new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]+$`),
        Validators.min(5),
        Validators.max(100),
      ]),
      thoiGianBatDau: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      thoiGianKetThuc: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }
  public patchForm() {
    this.form.patchValue({
      tenDotGiamGia: this.dotGiamGiaRequest.tenDotGiamGia,
      giaTriPhanTram: this.dotGiamGiaRequest.giaTriPhanTram,
      thoiGianBatDau: this.dotGiamGiaRequest.thoiGianBatDau,
      thoiGianKetThuc: this.dotGiamGiaRequest.thoiGianKetThuc,
    });
    if (this.dotGiamGiaRequest?.trangThai == 1) {
      this.form.get("thoiGianBatDau").disable();
    } else {
      this.form.get("thoiGianBatDau").enable();
    }
  }
  public setDotGiamGiaRequest() {
    this.dotGiamGiaRequest.tenDotGiamGia = this.TenDotGiamGia._pendingValue;
    this.dotGiamGiaRequest.giaTriPhanTram = this.GiaTriPhanTram._pendingValue;

    // Convert Date
    const ngayBatDauDate = new Date(this.NgayBatDau._pendingValue);
    if (!isNaN(ngayBatDauDate.getTime())) {
      this.dotGiamGiaRequest.thoiGianBatDau = this.formatDate(ngayBatDauDate);
    }
    const ngayKetThucDate = new Date(this.NgayKetThuc._pendingValue);
    if (!isNaN(ngayKetThucDate.getTime())) {
      this.dotGiamGiaRequest.thoiGianKetThuc = this.formatDate(ngayKetThucDate);
    }

    // Convert ListIDSanPhamChiTiet
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    const milliseconds = this.padZero(date.getMilliseconds(), 1);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  private padZero(value: number, length: number = 2): string {
    return value.toString().padStart(length, "0");
  }

  public resetForm() {
    this.form.reset();
    if (this.typeForm === "update") {
      this.patchForm();
    }
  }
  public handleChangeTime(thoiGianBatDau: Date, thoiGianKetThuc: Date) {
    if (thoiGianBatDau instanceof Date) {
      this.form.controls["thoiGianBatDau"].setErrors({ invalid: true });
      return;
    }
    if (thoiGianKetThuc instanceof Date) {
      this.form.controls["thoiGianKetThuc"].setErrors({ invalid: true });
      return;
    }

    const currentTime = new Date();
    currentTime.setSeconds(0, 0);

    if (thoiGianBatDau > thoiGianKetThuc) {
      this.form.controls["thoiGianBatDau"].setErrors({ invalid: true });
      this.form.controls["thoiGianKetThuc"].setErrors({ invalid: true });
      return; // Return to exit function early
    }

    const startTime = new Date(thoiGianBatDau);
    const endTime = new Date(thoiGianKetThuc);

    if (startTime < currentTime) {
      this.form.controls["thoiGianBatDau"].setErrors({ pastDate: true });
      return; // Return to exit function early
    }

    const oneMinuteAfterStart = new Date(startTime.getTime() + 60000); // 60000 milliseconds = 1 minute
    if (endTime <= oneMinuteAfterStart) {
      this.form.controls["thoiGianKetThuc"].setErrors({ invalid: true });
      return; // Return to exit function early
    }

    // Nếu không có lỗi, xóa các lỗi hiện có
    this.form.controls["thoiGianBatDau"].setErrors(null);
    this.form.controls["thoiGianKetThuc"].setErrors(null);
  }

  private validateForm(): boolean {
    // Kiểm tra giá trị của các trường và trả về true nếu hợp lệ, false nếu không hợp lệ
    if (this.dotGiamGiaRequest.tenDotGiamGia === null) {
      this.toast.error("Tên Đợt Giảm Giá Đang Bị Trống");
      return false;
    } else if (this.dotGiamGiaRequest.giaTriPhanTram === null) {
      this.toast.error("Giá Trị Phần Trăm Đang Bị Trống");
      return false;
    } else if (this.dotGiamGiaRequest.thoiGianBatDau === null) {
      this.toast.error("Ngày Bắt Đầu Đợt Giảm Giá Đang Bị Trống");
      return false;
    } else if (this.dotGiamGiaRequest.thoiGianKetThuc === null) {
      this.toast.error("Ngày Kết Thúc Đợt Giảm Giá Đang Bị Trống");
      return false;
    } else if (this.dotGiamGiaRequest.listIdSanPhamChiTiet === null) {
      this.toast.error("Sản Phẩm Của Đợt Giảm Giá Đang Bị Trống");
      return false;
    } else if (this.dotGiamGiaRequest.listIdSanPhamChiTiet.length < 1) {
      this.toast.error("Sản Phẩm Của Đợt Giảm Giá Đang Bị Trống");
      return false;
    } else if (
      this.dotGiamGiaRequest.thoiGianBatDau >
      this.dotGiamGiaRequest.thoiGianKetThuc
    ) {
      this.toast.error(
        "Ngày Bắt Đầu Đợt Giảm Giá Không Được Lớn Hơn Ngày Kết Thúc Đợt Giảm Giá"
      );
      return false;
    }

    return true;
  }

  public handleSubmit = async () => {
    if (this.typeForm === "add") {
      Swal.fire({
        title: "Bạn có chắc chắn muốn thêm Đợt Giảm Giá mới?",
        cancelButtonText: "Hủy",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#32ba7c",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Thêm",
      }).then((result) => {
        if (result.isConfirmed) {
          this.setDotGiamGiaRequest();
          if (this.validateForm()) {
            this.service
              .addDotGiamGiaRequest(this.dotGiamGiaRequest)
              .subscribe({
                next: () => {
                  setTimeout(() => {
                    this.router.navigate(["/dot-giam-gia/ds-dot-giam-gia"]);
                  }, 300);
                  this.notifService.success("Thêm Đợt Giảm Giá Thành Công!");
                },
                error: (err) => {
                  console.log(err);
                  this.notifService.error(
                    `Thêm mới thất bại do ${err.error.message}`
                  );
                },
              });
          } else {
            Swal.fire({
              icon: "error",
              title: `Thêm mới thất bại!`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.turnOffOverlay("");
          }
        }
      });
    } else if (this.typeForm === "update") {
      Swal.fire({
        title: "Bạn có chắc chắn muốn cập nhật Đợt Giảm Giá này?",
        cancelButtonText: "Hủy",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#32ba7c",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Cập nhật",
      }).then((result) => {
        if (result.isConfirmed) {
          this.setDotGiamGiaRequest();
          if (this.validateForm()) {
            // Set DotGiamGiaRequest
            this.setDotGiamGiaRequest();
            // Notify the user
            // Call Service
            this.service
              .updateDotGiamGiaRequest(this.dotGiamGiaRequest)
              .subscribe({
                next: () => {
                  // Router
                  setTimeout(() => {
                    this.router.navigate(["/dot-giam-gia/ds-dot-giam-gia"]);
                  }, 300);
                  // Noti
                  this.notifService.success(
                    "Cập Nhật Đợt Giảm Giá Thành Công!"
                  );
                },
                error: (err) => {
                  console.log(err);
                  this.notifService.success(
                    `Cập nhật mới thất bại do ${err.error.message}`
                  );
                },
              });
          } else {
            Swal.fire({
              icon: "error",
              title: `Cập nhật thất bại!`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.turnOffOverlay("");
          }
        }
      });
    }
  };

  public handleCheckNameRealTime(): void {
    const name = this.form.get("tenDotGiamGia").value;
    this.service.realTimeNameCheck(name).subscribe({
      next: (value) => {
        if (value) {
          this.form.controls["tenDotGiamGia"].setErrors({ invalid: true });
          document.getElementById("nameInvalid3").style.display = "block";
        } else {
          document.getElementById("nameInvalid3").style.display = "none";
        }
      },
    });
  }
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }

  // Get FormControl
  public get TenDotGiamGia() {
    return this.form.get("tenDotGiamGia");
  }
  public get GiaTriPhanTram() {
    return this.form.get("giaTriPhanTram");
  }
  public get NgayBatDau() {
    return this.form.get("thoiGianBatDau");
  }
  public get NgayKetThuc() {
    return this.form.get("thoiGianKetThuc");
  }
  // End Get FormControl
}
