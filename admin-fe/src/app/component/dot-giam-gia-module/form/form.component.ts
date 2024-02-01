
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";

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

  constructor(private service: DotGiamGiaService,private toast: ToastrService, private router: Router) {}
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
      thoiGianBatDau: new FormControl(null, [Validators.required]),
      thoiGianKetThuc: new FormControl(null, [Validators.required]),
    });
  }

  public setDotGiamGiaRequest() {
    this.dotGiamGiaRequest.tenDotGiamGia = this.TenDotGiamGia._pendingValue;
    this.dotGiamGiaRequest.giaTriPhanTram = this.GiaTriPhanTram._pendingValue;
    this.dotGiamGiaRequest.thoiGianBatDau = this.NgayBatDau._pendingValue;
    this.dotGiamGiaRequest.thoiGianKetThuc = this.NgayKetThuc._pendingValue;
  }

  public resetForm() {
    this.form.reset();
  }

  private validateForm(): boolean {
    // Kiểm tra giá trị của các trường và trả về true nếu hợp lệ, false nếu không hợp lệ
    if(this.dotGiamGiaRequest.tenDotGiamGia === null){
      this.toast.error("Tên Đợt Giảm Giá Đang Bị Trống");
      return false;
    }else if(this.dotGiamGiaRequest.giaTriPhanTram === null){
      this.toast.error("Giá Trị Phần Trăm Đang Bị Trống");
      return false;
    } else if(this.dotGiamGiaRequest.thoiGianBatDau === null){
      this.toast.error("Ngày Bắt Đầu Đợt Giảm Giá Đang Bị Trống");
      return false;
    } else if(this.dotGiamGiaRequest.thoiGianKetThuc === null){
      this.toast.error("Ngày Kết Thúc Đợt Giảm Giá Đang Bị Trống");
      return false;
    } else if(this.dotGiamGiaRequest.listIdSanPhamChiTiet === null){
      this.toast.error("Sản Phẩm Chi Tiết Đợt Giảm Giá Đang Bị Trống");
      return false;
    } else if( this.dotGiamGiaRequest.thoiGianBatDau > this.dotGiamGiaRequest.thoiGianKetThuc){
      this.toast.error("Ngày Bắt Đầu Đợt Giảm Giá Không Được Lớn Hơn Ngày Kết Thúc Đợt Giảm Giá");
      return false;
    }
    return true;
  }

  public handleSubmit = async() => {
    if (this.typeForm === "add") {
      this.setDotGiamGiaRequest();
      if (this.validateForm()) {
        this.service.addDotGiamGiaRequest(this.dotGiamGiaRequest).subscribe();
        setTimeout(() => {
          this.router.navigate(["/dot-giam-gia/ds-dot-giam-gia"]);
        },300);
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
    return this.form.get("thoiGianBatDau");
  }
  public get NgayKetThuc() {
    return this.form.get("thoiGianKetThuc");
  }
  // End Get FormControl
}
