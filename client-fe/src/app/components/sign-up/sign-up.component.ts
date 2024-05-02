import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { NotificationService } from "src/app/service/notification.service";
import Swal, { SweetAlertResult } from "sweetalert2";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent {
  public signUpForm: FormGroup;
  public provinces: any[];
  public districts: any[];
  public wards: any[];
  public provinceId: number;
  public districtId: number;
  public wardId: number;

  public acceptPolicy: boolean = false;
  public pwdInputType = false;

  // constructor, ngOn
  constructor(
    private router: Router,
    private ghnService: GiaoHangNhanhService,
    private notifService: NotificationService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initSignUpForm();
    this.getAllProvinces();
  }

  // public functions
  //
  public togglePwdInputType(): void {
    this.pwdInputType = !this.pwdInputType;
  }

  //
  public getAllDistrictsByProvince(): void {
    this.wards = [];
    this.getProvinceId();
    this.ghnService.getAllDistrictByProvinceID(this.provinceId).subscribe({
      next: (resp: any) => {
        this.districts = resp.data;
        this.signUpForm.get("tinh").setValue(this.getProvinceName());
      },
    });
  }

  private getProvinceId(): void {
    for (let i = 0; i < this.provinces.length; i++) {
      const element = this.provinces[i];
      if (element.NameExtension.includes(this.signUpForm.get("tinh").value)) {
        this.provinceId = element.ProvinceID;
        break;
      }
    }
  }

  private getProvinceName(): string {
    let provinceName = this.signUpForm.get("tinh").value;
    if (provinceName == null || provinceName == "") {
      this.provinces.forEach((p) => {
        if (p.ProvinceID == this.provinceId) {
          provinceName = p.ProvinceName;
        }
      });
    }
    return provinceName;
  }

  //
  public getAllWardsByDistrict(): void {
    this.getDistrictId();
    this.ghnService.getAllWardByDistrictID(this.districtId).subscribe({
      next: (resp: any) => {
        this.wards = resp.data;
        this.signUpForm.get("huyen").setValue(this.getDistrictName());
      },
    });
  }

  private getDistrictId(): void {
    for (let i = 0; i < this.districts.length; i++) {
      const element = this.districts[i];
      if (element.NameExtension.includes(this.signUpForm.get("huyen").value)) {
        this.districtId = element.DistrictID;
        break;
      }
    }
  }

  private getDistrictName(): string {
    let districtName = this.signUpForm.get("huyen").value;
    this.districts.forEach((d) => {
      if (d.DistrictID == this.districtId) {
        districtName = d.DistrictName;
      }
    });
    return districtName;
  }

  //
  public checkProvinceSelection(): void {
    if (!this.provinceId) {
      this.notifService.warning("Vui lòng chọn tỉnh/thành phố trước!");
      return;
    }
  }

  //
  public checkDistrictSelection(): void {
    if (!this.provinceId || !this.districtId) {
      this.notifService.warning("Vui lòng chọn quận/huyện trước!");
      return;
    }
  }

  //
  public signUp(): void {
    Swal.fire({
      title: "Bạn đồng ý đăng ký với thông tin trên?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng ký",
    }).then((result: SweetAlertResult) => {
      let trimmedHoTen = this.signUpForm.get("hoTen").value.trim();
      this.signUpForm.get("hoTen")?.setValue(trimmedHoTen);

      let trimmedEmail = this.signUpForm.get("email").value.trim();
      this.signUpForm.get("email")?.setValue(trimmedEmail);

      let trimmedDuong = this.signUpForm.get("duong").value.trim();
      this.signUpForm.get("duong")?.setValue(trimmedDuong);

      if (result.isConfirmed) {
        this.authService.signUp(this.signUpForm.value).subscribe({
          next: (cust: Customer) => {
            this.notifService.success("Đăng ký thành công!");
            this.initSignUpForm();
            this.router.navigate(["/log-in"]);
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(
              `Đăng ký thất bại! \n${errResp.error.message}`
            );
          },
        });
      }
    });
  }

  // private functions
  // 1
  private initSignUpForm(): void {
    this.signUpForm = new FormGroup({
      hoTen: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-ZÀ-ỹ\\s]+$"),
      ]),
      sdt: new FormControl("", [
        Validators.required,
        Validators.pattern("^(0[1-9][0-9]{8})$"),
      ]),
      email: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
      ]),
      ngaySinh: new FormControl("", [
        Validators.required,
        this.pastDateValidator,
      ]),
      gioiTinh: new FormControl(true, [Validators.required]),
      matKhau: new FormControl("", [
        Validators.required,
        this.pwdPaternValidator,
      ]),
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      duong: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-ZÀ-ỹ0-9-_/,.\\s]+$"),
      ]),
    });
  }

  // 1.1
  private pastDateValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate >= currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  // 1.2
  private customRequiredValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }

  // 1.3
  private pwdPaternValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const pattern = /^[a-zA-Z0-9]{8,}$/;
    const value = control.value.trim();
    const array = value.split("");

    // check has uppercase
    let hasUpperCase = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] >= "A" && array[i] <= "Z") {
        hasUpperCase = true;
        break;
      }
    }

    // check has number
    let hasNumber = false;
    for (let i = 0; i < array.length; i++) {
      if (
        !Number.isNaN(parseInt(array[i])) &&
        parseInt(array[i]) >= 0 &&
        parseInt(array[i]) <= 9
      ) {
        hasNumber = true;
        break;
      }
    }

    if (value.match(pattern) && hasUpperCase) {
      return null;
    }
    return { pwdPattern: true };
  }

  //
  private getAllProvinces(): void {
    this.districts = [];
    this.wards = [];
    this.ghnService.getAllProvince().subscribe({
      next: (resp) => {
        this.provinces = resp.data;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }
}
