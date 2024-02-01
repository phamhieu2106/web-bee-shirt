import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from "ngx-scanner-qrcode";
import { ToastrService } from "ngx-toastr";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { NhanVienService } from "src/app/service/nhan-vien.service";

@Component({
  selector: "app-them-nhan-vien",
  templateUrl: "./them-nhan-vien.component.html",
  styleUrls: ["./them-nhan-vien.component.css"],
})
export class ThemNhanVienComponent {
  icon: string = "fa-solid fa-users";
  title: string = "Nhân Viên";
  mainHeading: string = "Nhân Viên";

  @ViewChild("action") action!: NgxScannerQrcodeComponent;

  public addForm: any;
  private sdtRegex: string = "0[0-9]{9}";
  public arrayQR: any[];
  public pagedResponse: PagedResponse<NhanVienResponse>;

  constructor(
    private nhanVienService: NhanVienService,
    private toastr: ToastrService,
    private router: Router
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

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e && e.length > 0) {
      const qrCodeValue = e[0].value;
      action.stop();
      document.getElementById("closeFormQRCode").click();

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
    this.nhanVienService.add(this.addForm.value).subscribe({
      next: () => {
        // this.goToPage(1, 5, "");
        this.initAddForm();
        this.toastr.success("Thêm nhân viên mới thành công", "Thành công");
        this.router.navigate(["/nhan-vien/ds-nhan-vien"]);
      },
      error: (erros: HttpErrorResponse) => {
        this.toastr.error("Thêm nhân viên thất bại", "Thất bại");
        console.log(erros.message);
      },
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
        Validators.minLength(12),
        Validators.maxLength(12),
      ]),
      hoTen: new FormControl(hoTenQR === undefined ? "" : hoTenQR, [
        Validators.required,
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
      email: new FormControl("", [Validators.required, Validators.email]),
      diaChi: new FormControl(diaChiQR === undefined ? "" : diaChiQR, [
        Validators.required,
      ]),
      tenDangNhap: new FormControl("", [Validators.required]),
      matKhau: new FormControl("", [Validators.required]),
    });
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

  // private getAllNhanVien(): void {
  //   this.nhanVienService.getAll().subscribe({
  //     next: (response: PagedResponse<NhanVienResponse>) => {
  //       this.pagedResponse = response;
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
