import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from "ngx-scanner-qrcode";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { KhachHangService } from "src/app/service/khach-hang.service";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

import { AuthenticationService } from "src/app/service/authentication.service";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";

@Component({
  selector: "app-them-khach-hang",
  templateUrl: "./them-khach-hang.component.html",
  styleUrls: ["./them-khach-hang.component.css"],
})
export class ThemKhachHangComponent {
  icon: string = "fa-solid fa-users";
  title: string = "khách hàng";
  mainHeading: string = "khách hàng";
  public formAddKh: FormGroup;
  private sdtRegex: string = "0[0-9]{9}";
  public khachHangResponse: KhachHangResponse;
  tinhs: any[];
  huyens: any[];
  xas: any[];
  idTinh: number;
  idHuyen: number;
  idXa: number;
  selectedCity: string;
  diaChiVaPhiVanChuyen? = new DiaChiVaPhiVanChuyen();
  private selectFile: File;
  errorMessage: string = "";
  public isLoadding = false;
  public overlayText: string = "";
  imageUrl: string;
  @ViewChild("fileInput") fileInput: ElementRef;
  @ViewChild("action") action!: NgxScannerQrcodeComponent;

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

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e && e.length > 0) {
      const qrCodeValue = e[0].value;
      action.stop();
      document.getElementById("closeFormQRCode").click();
      var arrayQR = qrCodeValue.split("|");
      const year = parseInt(arrayQR[3].substring(4, 8));
      const month = parseInt(arrayQR[3].substring(2, 4)) - 1;
      const day = parseInt(arrayQR[3].substring(0, 2));
      const address = arrayQR[5].split(",");
      const dateObject = new Date(year, month, day);
      const formattedDate = dateObject.toLocaleDateString("en-CA");
      this.formAddKh = new FormGroup({
        hoTen: new FormControl(arrayQR[2] === undefined ? "" : arrayQR[2], [
          Validators.required,
        ]),
        ngaySinh: new FormControl(
          formattedDate === undefined ? "" : formattedDate,
          [Validators.required]
        ),
        gioiTinh: new FormControl(
          arrayQR[4] === undefined
            ? "true"
            : arrayQR[4] === "Nam"
            ? "true"
            : "false",
          [Validators.required]
        ),
        duong: new FormControl(address[0] === undefined ? "" : address[0], [
          Validators.required,
        ]),
        sdt: new FormControl("", [
          Validators.required,
          Validators.pattern(/^(84|\+84|0)[1-9][0-9]{8}$/),
        ]),
        imageUrl: new FormControl(""),
        matKhau: new FormControl("12345678"),
        email: new FormControl("", [
          Validators.required,
          Validators.pattern(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/),
        ]),
        huyen: new FormControl("", [Validators.required]),
        tinh: new FormControl(address[3] === undefined ? "" : address[3], [
          Validators.required,
        ]),
        xa: new FormControl("", [Validators.required]),
      });
    }
    console.log(arrayQR);
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(event.target.files);
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
    }
  }
  public imageChange(event: any): void {
    this.selectFile = event.target["files"][0];
  }

  public addKH(): void {
    if (this.selectFile == null) {
      this.toas.error("Chưa thêm ảnh", "Thất bại");
      return;
    } else if (
      new Date(this.formAddKh.value.ngaySinh) > new Date() ||
      new Date(this.formAddKh.value.ngaySinh).toDateString() ===
        new Date().toDateString()
    ) {
      this.toas.error("Ngày sinh không được sau ngày hiện tại", "Thất bại");
      return;
    }
    Swal.fire({
      title: "Thêm khách hàng mới?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result) => {
      if (result.isConfirmed) {
        const randomPassword = this.generateRandomPassword();
        // Cập nhật giá trị của trường matKhau
        this.formAddKh.patchValue({
          matKhau: randomPassword,
        });
        this.turnOnOverlay("Đang thêm...");
        this.khachHangService
          .add(this.formAddKh.value, this.selectFile)
          .subscribe({
            next: () => {
              // this.goToPage(1, 5, "");
              this.initFormAddKh();
              Swal.fire({
                toast: true,
                icon: "success",
                position: "top-end",
                title: "Thêm khách hàng thành công",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              // this.send(
              //   this.formAddKh.value.hoTen,
              //   this.formAddKh.value.matKhau,
              //   this.formAddKh.value.email
              // );
              this.turnOffOverlay("");
              this.router.navigate(["/khach-hang/ds-khach-hang"]);
            },
            error: (error: HttpErrorResponse) => {
              this.turnOffOverlay("");
              if (error.status === 400) {
                this.errorMessage = error.error.message;
                Swal.fire({
                  toast: true,
                  icon: "error",
                  position: "top-end",
                  title: this.errorMessage,
                  showConfirmButton: false,
                  timer: 3000,
                });
              } else {
                Swal.fire({
                  toast: true,
                  icon: "error",
                  position: "top-end",
                  title: "Thêm khách hàng thất bại",
                  showConfirmButton: false,
                  timer: 3000,
                });
                console.log(error.message);
              }
            },
          });
      }
    });
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
    console.log("password ", password);
    return password;
  }

  public initFormAddKh(): void {
    this.formAddKh = new FormGroup({
      hoTen: new FormControl("", [Validators.required]),
      gioiTinh: new FormControl("", [Validators.required]),
      trangThai: new FormControl("1"),
      sdt: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(84|\+84|0)[1-9][0-9]{8}$/),
      ]),
      // imageUrl: new FormControl(""),
      ngaySinh: new FormControl("", [Validators.required]),
      matKhau: new FormControl("12345678"),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/),
      ]),
      huyen: new FormControl("", [Validators.required]),
      tinh: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
    });
  }

  fillData() {
    // get all tỉnh => lọc ds tìm tinhId
    this.getAllTinh();
    setTimeout(() => this.findTinhId(), 100);

    // get all huyện => lọc danh sách tìm xaId
    setTimeout(() => this.getAllHuyenByTinh(), 200);
    setTimeout(() => this.findHuyenId(), 400);

    // get all xã
    setTimeout(() => this.getAllXaByHuyen(), 600);
    setTimeout(() => this.findXaId(), 800);
  }
  findXaId() {
    for (let i = 0; i < this.xas.length; i++) {
      const element = this.xas[i];
      if (element.NameExtension.includes(this.diaChiVaPhiVanChuyen.xa)) {
        this.diaChiVaPhiVanChuyen.xaCode = element.WardCode;
        break;
      }
    }
  }
  findHuyenId() {
    for (let i = 0; i < this.huyens.length; i++) {
      const element = this.huyens[i];
      if (element.NameExtension.includes(this.formAddKh.get("huyen").value)) {
        this.idHuyen = element.DistrictID;
        break;
      }
    }
  }
  findTinhId() {
    for (let i = 0; i < this.tinhs.length; i++) {
      const element = this.tinhs[i];
      if (element.NameExtension.includes(this.formAddKh.get("tinh").value)) {
        this.idTinh = element.ProvinceID;
        break;
      }
    }
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
    this.findTinhId();
    this.ghn.getAllDistrictByProvinceID(this.idTinh).subscribe({
      next: (resp) => {
        this.huyens = resp.data;
        this.formAddKh.get("tinh").setValue(this.getTenTinh());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllXaByHuyen() {
    this.findHuyenId();
    this.ghn.getAllWardByDistrictID(this.idHuyen).subscribe({
      next: (resp) => {
        this.xas = resp.data;
        this.formAddKh.get("huyen").setValue(this.getTenHuyen());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTenTinh(): string {
    let provinceName = this.formAddKh.get("tinh").value;
    if (provinceName == null || provinceName == "") {
      this.tinhs.forEach((t) => {
        if (t.ProvinceID == this.idTinh) {
          provinceName = t.ProvinceName;
        }
      });
    }
    return provinceName;
  }
  getTenHuyen(): string {
    let districtName = this.formAddKh.get("huyen").value;
    this.huyens.forEach((t) => {
      if (t.DistrictID == this.diaChiVaPhiVanChuyen.huyenId) {
        districtName = t.DistrictName;
      }
    });
    return districtName;
  }
  getTenXa(): string {
    let wardName = "";
    this.xas.forEach((t) => {
      if (t.WardCode == this.diaChiVaPhiVanChuyen.xaCode) {
        wardName = t.WardName;
      }
    });
    return wardName;
  }

  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
