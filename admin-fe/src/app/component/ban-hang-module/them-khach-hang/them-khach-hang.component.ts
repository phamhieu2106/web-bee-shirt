import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import emailjs from "@emailjs/browser";

import { KhachHangService } from "src/app/service/khach-hang.service";
import Swal from "sweetalert2";
import { AuthenticationService } from "src/app/service/authentication.service";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { NotificationService } from "src/app/service/notification.service";
import { KhachHang } from "src/app/model/class/KhachHang.class";
@Component({
  selector: "app-them-khach-hang",
  templateUrl: "./them-khach-hang.component.html",
  styleUrls: ["./them-khach-hang.component.css"],
})
export class ThemKhachHangComponent {
  public formAddKh: FormGroup;
  private sdtRegex: string = "0[0-9]{9}";
  tinhs: any[];
  huyens: any[];
  xas: any[];
  xaIndex = -1;
  huyenIndex = -1;
  tinhIndex = -1;
  private idModal = "closeModalThemKhachHang";

  @Output() createSuccess = new EventEmitter<KhachHang>();
  @Output() closeModal = new EventEmitter<string>();
  @ViewChild("addCustomerModal") addCustomerModal!: ElementRef;
  constructor(
    private khachHangService: KhachHangService,
    private notify: NotificationService,
    private ghn: GiaoHangNhanhService,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.initFormAddKh();
    this.getAllTinh();
  }

  public addKH(): void {
    if (
      new Date(this.formAddKh.value.ngaySinh) > new Date() ||
      new Date(this.formAddKh.value.ngaySinh).toDateString() ===
        new Date().toDateString()
    ) {
      this.notify.error("Ngày sinh không được sau ngày hiện tại");
      return;
    }
    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý thêm không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.formAddKh.get("hoTen").value.trim() != "") {
          this.khachHangService.addQuick(this.formAddKh.value).subscribe({
            next: (resp: KhachHang) => {
              this.initFormAddKh();

              // console.log(resp);
              this.createSuccess.emit(resp);
              this.closeModal.emit(this.idModal);
              this.notify.success("Thêm khách hàng thành công ");
            },
            error: (error: HttpErrorResponse) => {
              this.notify.error(error.error.message);
            },
          });
        } else {
          this.notify.warning("Tên khách hàng không hợp lệ");
        }
      }
    });
  }

  private generateRandomPassword(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  }

  public initFormAddKh(): void {
    this.formAddKh = new FormGroup({
      hoTen: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[\p{L}]+(?:\s[\p{L}]+)*$/u),
      ]),
      email: new FormControl(""),
      gioiTinh: new FormControl("true"),
      sdt: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(0)[1-9][0-9]{8}$/),
      ]),
      ngaySinh: new FormControl(""),
      huyen: new FormControl(""),
      tinh: new FormControl(""),
      duong: new FormControl(""),
      xa: new FormControl(""),
      matKhau: new FormControl(this.generateRandomPassword()),
    });
  }

  getAllTinh() {
    this.huyens = [];
    this.xas = [];
    this.ghn.getAllProvince().subscribe({
      next: (resp) => {
        this.tinhs = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllHuyenByTinh() {
    this.xas = [];
    this.ghn
      .getAllDistrictByProvinceID(this.tinhs[this.tinhIndex].ProvinceID)
      .subscribe({
        next: (resp) => {
          this.huyens = resp.data;
          this.formAddKh
            .get("tinh")
            .setValue(
              this.tinhs[this.tinhIndex]
                ? this.tinhs[this.tinhIndex].ProvinceName
                : ""
            );
          this.formAddKh.get("huyen").setValue("");
          this.formAddKh.get("xa").setValue("");
          // this.diaChiVaPhiVanChuyen
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAllXaByHuyen() {
    this.ghn
      .getAllWardByDistrictID(this.huyens[this.huyenIndex].DistrictID)
      .subscribe({
        next: (resp) => {
          this.xas = resp.data;
          this.formAddKh
            .get("huyen")
            .setValue(
              this.huyens[this.huyenIndex]
                ? this.huyens[this.huyenIndex].DistrictName
                : ""
            );
          this.formAddKh.get("xa").setValue("");
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getXa() {
    this.formAddKh
      .get("xa")
      .setValue(this.xas[this.xaIndex] ? this.xas[this.xaIndex].WardName : "");
  }

  private send(hoTen: string, matKhau: string, email: string) {
    emailjs.init("XlFoYJLd1vcoTgaEY");
    emailjs.send("service_uxvm75s", "template_k18lsvj", {
      from_name: this.authService.getUserFromStorage().hoTen,
      to_name: hoTen,
      message: matKhau,
      to_email: email,
    });
  }
}
