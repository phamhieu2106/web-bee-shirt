import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { AuthenticationService } from "src/app/service/authentication.service";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { KhachHangService } from "src/app/service/khach-hang.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-them-khach-hang",
  templateUrl: "./them-khach-hang.component.html",
  styleUrls: ["./them-khach-hang.component.css"],
})
export class ThemKhachHangComponent {
  public formAddKh: FormGroup;
  private sdtRegex: string = "0[0-9]{9}";
  public khachHangResponse: KhachHangResponse;
  tinhs: any[];
  huyens: any[];
  xas: any[];
  diaChiVaPhiVanChuyen? = new DiaChiVaPhiVanChuyen();
  constructor(
    private router: Router,
    private khachHangService: KhachHangService,
    private toas: ToastrService,
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
      this.toas.error("Ngày sinh không được sau ngày hiện tại", "Thất bại");
      return;
    }
  }

  // private send(hoTen: string, matKhau: string, email: string) {
  //   emailjs.init("XlFoYJLd1vcoTgaEY");
  //   emailjs.send("service_uxvm75s", "template_k18lsvj", {
  //     from_name: this.authService.getUserFromStorage().hoTen,
  //     to_name: hoTen,
  //     message: matKhau,
  //     to_email: email,
  //   });
  // }

  private generateRandomPassword(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  }

  public initFormAddKh(): void {}

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

  // getAllHuyenByTinh() {
  //   this.xas = [];
  //   this.ghn.getAllDistrictByProvinceID(this.idTinh).subscribe({
  //     next: (resp) => {
  //       this.huyens = resp.data;
  //       this.formAddKh.get("tinh").setValue(this.getTenTinh());
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getAllXaByHuyen() {
  //   this.findHuyenId();
  //   console.log(this.idTinh);
  //   console.log(this.idHuyen);

  //   this.ghn.getAllWardByDistrictID(this.idHuyen).subscribe({
  //     next: (resp) => {
  //       this.xas = resp.data;
  //       this.formAddKh.get("huyen").setValue(this.getTenHuyen());
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
