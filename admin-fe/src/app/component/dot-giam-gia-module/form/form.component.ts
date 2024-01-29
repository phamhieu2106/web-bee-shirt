import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
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

  constructor(private toast: ToastrService, private router: Router) {}
  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.form = new FormGroup({
      tenDotGiamGia: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\p{L}0-9\s]+$/u),
      ]),
      giaTriPhanTram: new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]+$`),
        Validators.min(5),
        Validators.max(100),
      ]),
      ngayBatDau: new FormControl(null, [Validators.required]),
      ngayKetThuc: new FormControl(null, [Validators.required]),
    });
  }

  public setDotGiamGiaRequest() {
    this.dotGiamGiaRequest.tenDotGiamGia = this.TenDotGiamGia._pendingValue;
    this.dotGiamGiaRequest.giaTriPhanTram = this.GiaTriPhanTram._pendingValue;
    this.dotGiamGiaRequest.ngayBatDau = this.NgayBatDau._pendingValue;
    this.dotGiamGiaRequest.ngayKetThuc = this.NgayKetThuc._pendingValue;
  }

  public resetForm() {
    this.form.reset();
  }

  private validateForm(): boolean {
    // Kiểm tra giá trị của các trường và trả về true nếu hợp lệ, false nếu không hợp lệ

    if (
      this.dotGiamGiaRequest.tenDotGiamGia === null ||
      this.dotGiamGiaRequest.giaTriPhanTram === null ||
      this.dotGiamGiaRequest.ngayBatDau === null ||
      this.dotGiamGiaRequest.ngayKetThuc === null ||
      this.dotGiamGiaRequest.listIdSanPhamChiTiet === null ||
      this.dotGiamGiaRequest.ngayBatDau > this.dotGiamGiaRequest.ngayKetThuc
    ) {
      return false;
    }

    return true;
  }

  public handleSubmit = () => {
    if (this.typeForm === "add") {
      this.setDotGiamGiaRequest();
      if (this.validateForm()) {
        this.toast.success("Thêm Đợt Giảm Giá Thành Công!");
      } else {
        this.toast.error("Thêm đợt giảm giá không thành công");
      }
      console.log(this.dotGiamGiaRequest);
    } else if (this.typeForm === "update") {
      console.log("handle update");
    }
  };

  // Get FormControl
  public get TenDotGiamGia() {
    return this.form.get("tenDotGiamGia");
  }
  public get GiaTriPhanTram() {
    return this.form.get("giaTriPhanTram");
  }
  public get NgayBatDau() {
    return this.form.get("ngayBatDau");
  }
  public get NgayKetThuc() {
    return this.form.get("ngayKetThuc");
  }
  // End Get FormControl
}
