import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from "ngx-scanner-qrcode";
import { ToastrService } from "ngx-toastr";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { AuthenticationService } from "src/app/service/authentication.service";
import { NhanVienService } from "src/app/service/nhan-vien.service";

import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

@Component({
  selector: "app-them-nhan-vien",
  templateUrl: "./them-nhan-vien.component.html",
  styleUrls: ["./them-nhan-vien.component.css"],
})
export class ThemNhanVienComponent {
  icon: string = "fa-solid fa-users";
  title: string = "Nhân Viên";
  mainHeading: string = "Nhân Viên";
  errorMessage: string = "";

  @ViewChild("action") action!: NgxScannerQrcodeComponent;
  @ViewChild("fileInput") fileInput: ElementRef;

  public addForm: any;
  // private hoTenRegex: string = "^[\\p{L}\\s]+$";
  private sdtRegex: string = "0[0-9]{9}";
  private cccdRegex: string = "0[0-9]{11}";
  private emailRegex: string = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$";
  public arrayQR: any[];
  public pagedResponse: PagedResponse<NhanVienResponse>;
  public imageUrl: string;
  private selectFile: File;

  constructor(
    private nhanVienService: NhanVienService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initAddForm();
    // const qrCodeValue =
    //   "023686002531|134220866|Hoàng Thùy Dương|22102000|Nam|Khu 1, Minh Khương, Hàm Yên, Tuyên Quang|25052020";
    // var arrayQR = qrCodeValue.split("|");

    // const year = parseInt(arrayQR[3].substring(4, 8));
    // const month = parseInt(arrayQR[3].substring(2, 4)) - 1;
    // const day = parseInt(arrayQR[3].substring(0, 2));
    // const dateObject = new Date(year, month, day);
    // const formattedDate = dateObject.toLocaleDateString("en-CA");

    // this.initAddForm(
    //   arrayQR[0],
    //   arrayQR[2],
    //   formattedDate,
    //   arrayQR[4],
    //   arrayQR[5]
    // );
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  public imageChange(event: any): void {
    this.selectFile = event.target["files"][0];
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e && e.length > 0) {
      const qrCodeValue = e[0].value;
      console.log(qrCodeValue);
      action.stop();
      document.getElementById("closeFormQRCode").click();

      if ((qrCodeValue.match(/\|/g) || []).length !== 6) {
        this.toastr.error("Mã QR không hợp lệ", "Thất bại");
        return;
      }

      var arrayQR = qrCodeValue.split("|");

      const year = parseInt(arrayQR[3].substring(4, 8));
      const month = parseInt(arrayQR[3].substring(2, 4)) - 1;
      const day = parseInt(arrayQR[3].substring(0, 2));
      const dateObject = new Date(year, month, day);
      const formattedDate = dateObject.toLocaleDateString("en-CA");

      this.initAddForm(
        arrayQR[0],
        arrayQR[2],
        formattedDate,
        arrayQR[4],
        arrayQR[5]
      );
      // 023686002531|134220866|Hoàng Thùy Dương|22102000|Nữ|Khu 1, Minh Khương, Hàm Yên, Tuyên Quang|25052020
    }
  }

  addNhanVien(): void {
    if (this.selectFile == null) {
      this.toastr.error("Chưa thêm ảnh", "Thất bại");
      return;
    } else if (
      new Date(this.addForm.value.ngaySinh) > new Date() ||
      new Date(this.addForm.value.ngaySinh).toDateString() ===
        new Date().toDateString()
    ) {
      this.toastr.error("Ngày sinh không được sau ngày hiện tại", "Thất bại");
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
        const randomPassword = this.generateRandomPassword();

        // Cập nhật giá trị của trường matKhau
        this.addForm.patchValue({
          matKhau: randomPassword,
        });

        this.nhanVienService
          .add(this.addForm.value, this.selectFile)
          .subscribe({
            next: () => {
              const addFormValue = JSON.parse(
                JSON.stringify(this.addForm.value)
              );
              this.send(
                addFormValue.hoTen,
                addFormValue.matKhau,
                addFormValue.email
              );
              // this.goToPage(1, 5, "");
              this.initAddForm();
              Swal.fire({
                toast: true,
                icon: "success",
                position: "top-end",
                title: "Thêm nhân viên thành công",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              this.router.navigate(["/nhan-vien/ds-nhan-vien"]);
            },
            error: (error: HttpErrorResponse) => {
              if (error.status === 400) {
                // Trích xuất thông điệp lỗi từ response
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
                  title: "Thêm nhân viên thất bại",
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

  public reloadForm() {
    this.initAddForm();
  }

  public initAddForm(
    cccdQR?: string,
    hoTenQR?: string,
    ngaySinhQR?: string,
    gioiTinhQR?: string,
    diaChiQR?: string
  ): void {
    this.addForm = new FormGroup({
      cccd: new FormControl(cccdQR === undefined ? "" : cccdQR, [
        Validators.required,
        Validators.pattern(this.cccdRegex),
      ]),
      hoTen: new FormControl(hoTenQR === undefined ? "" : hoTenQR.trim(), [
        Validators.required,
        Validators.pattern(/^[\p{L}]+(?:\s[\p{L}]+)*$/u),
      ]),
      ngaySinh: new FormControl(ngaySinhQR === undefined ? "" : ngaySinhQR, [
        Validators.required,
      ]),
      sdt: new FormControl("", [
        Validators.required,
        Validators.pattern(this.sdtRegex),
      ]),
      gioiTinh: new FormControl(
        gioiTinhQR === undefined
          ? "true"
          : gioiTinhQR === "Nam"
          ? "true"
          : "false",
        [Validators.required]
      ),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
      diaChi: new FormControl(diaChiQR === undefined ? "" : diaChiQR, [
        Validators.required,
        // Validators.pattern(/^[\p{L}\d]+(?:\s+[\p{L}\d]+)*$/u),
      ]),
      matKhau: new FormControl(""),
      role: new FormControl("ROLE_STAFF"),
    });
  }

  private send(hoTen: string, matKhau: string, email: string) {
    emailjs.init("XlFoYJLd1vcoTgaEY");
    emailjs.send("service_uxvm75s", "template_k18lsvj", {
      from_name: this.authService.getUserFromStorage().hoTen,
      to_name: hoTen,
      message: matKhau,
      to_email: email,
      // from_email: this.authService.getUserFromStorage().email,
    });
  }

  // Hàm tạo mật khẩu ngẫu nhiên
  private generateRandomPassword(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.nhanVienService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<NhanVienResponse>) => {
        this.pagedResponse = response;
        console.log(this.pagedResponse);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
