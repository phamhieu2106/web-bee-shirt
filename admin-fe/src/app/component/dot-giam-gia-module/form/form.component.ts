import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";
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
    private router: Router
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
        Validators.pattern(/^[\p{L}0-9\s]+$/u),
        Validators.pattern(/^[\p{L}0-9]+(?:[\s]?[\p{L}0-9]+)*$/u),
      ]),
      giaTriPhanTram: new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]+$`),
        Validators.min(5),
        Validators.max(100),
      ]),
      thoiGianBatDau: new FormControl(null, [Validators.required]),
      thoiGianKetThuc: new FormControl(null, [Validators.required]),
    });
  }
  public patchForm() {
    this.form.patchValue({
      tenDotGiamGia: this.dotGiamGiaRequest.tenDotGiamGia,
      giaTriPhanTram: this.dotGiamGiaRequest.giaTriPhanTram,
      thoiGianBatDau: this.dotGiamGiaRequest.thoiGianBatDau,
      thoiGianKetThuc: this.dotGiamGiaRequest.thoiGianKetThuc,
    });
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

  private validateForm(): boolean {
    const thoiGianBatDau: Date = new Date(
      this.dotGiamGiaRequest.thoiGianBatDau
    );
    const thoiGianKetThuc: Date = new Date(
      this.dotGiamGiaRequest.thoiGianKetThuc
    );
    const thoiGianKetThuc30PhutTruoc: Date = new Date(
      thoiGianBatDau.getTime() + 30 * 60000
    );

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
    } else if (
      this.dotGiamGiaRequest.thoiGianBatDau >
      this.dotGiamGiaRequest.thoiGianKetThuc
    ) {
      this.toast.error(
        "Ngày Bắt Đầu Đợt Giảm Giá Không Được Lớn Hơn Ngày Kết Thúc Đợt Giảm Giá"
      );
      return false;
    } else if (thoiGianKetThuc30PhutTruoc >= thoiGianKetThuc) {
      this.toast.error(
        "Thời Gian Kết Thúc Phải Nhiều Hơn 30 Phút Sau Thời Gian Bắt Đầu"
      );
      return false;
    }
    return true;
  }

  public handleSubmit = async () => {
    if (this.typeForm === "add") {
      this.setDotGiamGiaRequest();
      if (this.validateForm()) {
        Swal.fire({
          icon: "success",
          title: `Thêm mới thành công!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.turnOffOverlay("");

        this.service.addDotGiamGiaRequest(this.dotGiamGiaRequest).subscribe();
        setTimeout(() => {
          this.router.navigate(["/dot-giam-gia/ds-dot-giam-gia"]);
        }, 300);
        this.toast.success("Thêm Đợt Giảm Giá Thành Công!");
      } else {
        Swal.fire({
          icon: "error",
          title: `Thêm mới thất bại!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.turnOffOverlay("");
        this.toast.error("Thêm đợt giảm giá không thành công");
      }
    } else if (this.typeForm === "update") {
      this.setDotGiamGiaRequest();
      if (this.dotGiamGiaRequest.listIdSanPhamChiTiet.length < 1) {
        console.log("Bạn Muốn Xoá À?");
      }
      if (this.validateForm()) {
        // Set DotGiamGiaRequest
        this.setDotGiamGiaRequest();
        // Notify the user
        Swal.fire({
          icon: "success",
          title: `Cập nhật thành công ${this.dotGiamGiaRequest.id}''!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.turnOffOverlay("");
        // Call Service
        this.service
          .updateDotGiamGiaRequest(this.dotGiamGiaRequest)
          .subscribe();
        // Router
        setTimeout(() => {
          this.router.navigate(["/dot-giam-gia/ds-dot-giam-gia"]);
        }, 300);
        // Noti
        this.toast.success("Cập Nhật Đợt Giảm Giá Thành Công!");
      } else {
        Swal.fire({
          icon: "error",
          title: `Cập nhật thất bại!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.turnOffOverlay("");
        this.toast.error("Cập nhật giảm giá không thành công");
      }
    }
  };

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
