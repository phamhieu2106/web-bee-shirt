import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from "ngx-scanner-qrcode";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { DiaChiService } from "src/app/service/dia-chi.service";
import { KhachHangService } from "src/app/service/khach-hang.service";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { AuthenticationService } from "src/app/service/authentication.service";
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
  public tinh: any[] = [];
  public huyen: any[] = [];
  public xa: any[] = [];
  public idTinh: number;
  public idHuyen: number;
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
    private diaChi: DiaChiService,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.initFormAddKh();
    this.diaChi.getTinh().subscribe((data: any) => {
      this.tinh = data.results;
    });
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
      console.log(address[3]);
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
        // this.khachHangService.add(this.formAddKh.value, this.selectFile).subscribe({
    //   next: (kh: KhachHangResponse) => {
    //     this.initFormAddKh();
    //     if (
    //       new Date(this.formAddKh.value.ngaySinh) > new Date() ||
    //       new Date(this.formAddKh.value.ngaySinh).toDateString() ===
    //         new Date().toDateString()
    //     ) {
    //       this.toas.error("Ngày sinh không được sau ngày hiện tại", "Thất bại");
    //       return;
    //     }
    //     Swal.fire({
    //       icon: "success",
    //       title: `Thêm khách hàng mới thành công!`,
    //       showConfirmButton: false,
    //       timer: 1000,
    //     });

    //     this.router.navigate(["/khach-hang/ds-khach-hang"]);
    //   },
    //   error: (erros: HttpErrorResponse) => {},
    // });
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
      toast: true,
      title: "Bạn có đồng ý thêm không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result) => {
      this.turnOnOverlay("Đang thêm khách hàng mới....");
      if (result.isConfirmed) {
        const randomPassword = this.generateRandomPassword();

        // Cập nhật giá trị của trường matKhau
        this.formAddKh.patchValue({
          matKhau: randomPassword,
        });

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
              // this.turnOffOverlay("");
              this.router.navigate(["/khach-hang/ds-khach-hang"]);
            },
            error: (error: HttpErrorResponse) => {
              // this.turnOffOverlay("");
              
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

        this.send(
          this.formAddKh.value.hoTen,
          this.formAddKh.value.matKhau,
          this.formAddKh.value.email
        );
      }
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
  onCityChange(): void {
    const selectedTinh = this.tinh.find(
      (t) => t.province_name == this.formAddKh.get("tinh")?.value
    );
    if (selectedTinh) {
      const selectedId = selectedTinh.province_id;
      this.diaChi.getHuyen(selectedId).subscribe((data: any) => {
        this.huyen = data.results;
      });
    }
  }

  ondistrictChange(): void {
    const selectedHuyen = this.huyen.find(
      (t) => t.district_name == this.formAddKh.get("huyen")?.value
    );
    if (selectedHuyen) {
      const selectedId = selectedHuyen.district_id;
      this.diaChi.getXa(selectedId).subscribe((data: any) => {
        this.xa = data.results;
      });
    }
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
