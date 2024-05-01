import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import Swal, { SweetAlertResult } from "sweetalert2";

import { Address } from "src/app/model/class/address.class";
import { AddressService } from "src/app/service/address.service";
import { AuthenticationService } from "src/app/service/authentication.service";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-my-addresses",
  templateUrl: "./my-addresses.component.html",
  styleUrls: ["./my-addresses.component.css"],
})
export class MyAddressesComponent {
  public addresses: Address[] = [];
  public isAddAddressModalShow = false;
  public isUpdateAddressModalShow = false;
  public addAddressForm: FormGroup;
  public updateAddressForm: FormGroup;
  public provinces: any[];
  public districts: any[];
  public wards: any[];
  public provinceId: number;
  public districtId: number;
  public wardId: number;

  // constructor, ngOn
  constructor(
    private addressService: AddressService,
    private authService: AuthenticationService,
    private giaoHangNhanhService: GiaoHangNhanhService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllAddresses();
    this.getAllProvinces();
    this.initAddAddressForm();
    this.initUpdateAddressForm();
  }

  // public functions
  // 1
  public toggleAddAddressesModal(value: boolean): void {
    this.isAddAddressModalShow = value;
    if (!value) {
      this.initAddAddressForm();
      this.districts = [];
      this.wards = [];
    }
  }

  // 2
  public toggleUpdateAddressesModal(value: boolean): void {
    this.isUpdateAddressModalShow = value;
    if (value) {
      this.districts = [];
      this.wards = [];
    }
  }

  // 3
  public formatAddress(address: Address): string {
    return `${address.duong}, ${address.xa}, ${address.huyen}, ${address.tinh}`;
  }

  // 4
  public addAddress(): void {
    Swal.fire({
      title: "Thêm địa chỉ?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.addAddressForm
          .get("custId")
          .setValue(this.authService.getCustomerFromStorage().id);

        if (this.addAddressForm.invalid) {
          this.notifService.warning("Vui lòng điền đầy đủ thông tin!");
          return;
        }

        let trimmedHoTen = this.addAddressForm.get("hoTen").value.trim();
        this.addAddressForm.get("hoTen")?.setValue(trimmedHoTen);

        let trimmedDiaChi = this.addAddressForm.get("duong").value.trim();
        this.addAddressForm.get("duong")?.setValue(trimmedDiaChi);

        this.addressService.addAddress(this.addAddressForm.value).subscribe({
          next: () => {
            this.getAllAddresses();
            this.notifService.success("Thêm địa chỉ thành công!");
            this.isAddAddressModalShow = false;
            this.initAddAddressForm();
          },
          error: (errorRes: HttpErrorResponse) => {
            this.notifService.error(errorRes.error.message);
          },
        });
      }
    });
  }

  // 5
  public setDefaultAddress(addrId: number): void {
    Swal.fire({
      title: "Đặt địa chỉ này thành mặc định?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đặt",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.addressService.setDefaultAddress(addrId).subscribe({
          next: (addrRes) => {
            this.notifService.success("Đặt địa chỉ mặc định thành công!");
            this.addresses = this.addresses.map((a: Address) => {
              if (a.id === addrRes.id) {
                a.macDinh = true;
              } else {
                a.macDinh = false;
              }
              return a;
            });
          },
          error: (errorRes: HttpErrorResponse) => {
            this.notifService.error(errorRes.error.message);
          },
        });
      }
    });
  }

  // select address event functions
  // get districts by province
  // 6
  public getAllDistrictsByProvince(formType: string): void {
    this.wards = [];
    this.getProvinceId(formType);
    this.giaoHangNhanhService
      .getAllDistrictByProvinceID(this.provinceId)
      .subscribe({
        next: (resp: any) => {
          this.districts = resp.data;
          formType === "add"
            ? this.addAddressForm
                .get("tinh")
                .setValue(this.getProvinceName(formType))
            : this.updateAddressForm
                .get("tinh")
                .setValue(this.getProvinceName(formType));
        },
      });
  }

  // 6.1
  private getProvinceId(formType: string): void {
    for (let i = 0; i < this.provinces.length; i++) {
      const element = this.provinces[i];
      if (
        formType === "add" &&
        element.NameExtension.includes(this.addAddressForm.get("tinh").value)
      ) {
        this.provinceId = element.ProvinceID;
        break;
      } else if (
        formType === "update" &&
        element.NameExtension.includes(this.updateAddressForm.get("tinh").value)
      ) {
        this.provinceId = element.ProvinceID;
        break;
      }
    }
  }

  // 6.2
  private getProvinceName(formType: string): string {
    let provinceName =
      formType === "add"
        ? this.addAddressForm.get("tinh").value
        : this.updateAddressForm.get("tinh").value;
    if (provinceName == null || provinceName == "") {
      this.provinces.forEach((p) => {
        if (p.ProvinceID == this.provinceId) {
          provinceName = p.ProvinceName;
        }
      });
    }
    return provinceName;
  }

  // 7
  public getAllWardsByDistrict(formType: string): void {
    this.getDistrictId(formType);
    this.giaoHangNhanhService
      .getAllWardByDistrictID(this.districtId)
      .subscribe({
        next: (resp: any) => {
          this.wards = resp.data;
          formType === "add"
            ? this.addAddressForm
                .get("huyen")
                .setValue(this.getDistrictName(formType))
            : this.updateAddressForm
                .get("huyen")
                .setValue(this.getDistrictName(formType));
        },
      });
  }

  // 7.1
  private getDistrictId(formType: string): void {
    for (let i = 0; i < this.districts.length; i++) {
      const element = this.districts[i];
      if (
        formType === "add" &&
        element.NameExtension.includes(this.addAddressForm.get("huyen").value)
      ) {
        this.districtId = element.DistrictID;
        break;
      } else if (
        formType === "update" &&
        element.NameExtension.includes(
          this.updateAddressForm.get("huyen").value
        )
      ) {
        this.districtId = element.DistrictID;
        break;
      }
    }
  }

  // 7.2
  private getDistrictName(formType: string): string {
    let districtName =
      formType === "add"
        ? this.addAddressForm.get("huyen").value
        : this.updateAddressForm.get("huyen").value;
    this.districts.forEach((d) => {
      if (d.DistrictID == this.districtId) {
        districtName = d.DistrictName;
      }
    });
    return districtName;
  }

  // 8
  public checkProvinceSelection(): void {
    if (!this.provinceId) {
      this.notifService.warning("Vui lòng chọn tỉnh/thành phố trước!");
      return;
    }
  }

  // 9
  public checkDistrictSelection(): void {
    if (!this.provinceId) {
      this.notifService.warning("Vui lòng chọn quận/huyện trước!");
      return;
    }
  }
  // end: select address event functions

  // 10
  public openUpdateModal(addrId: number): void {
    this.toggleUpdateAddressesModal(true);
    this.addressService.getById(addrId).subscribe({
      next: (addrRes: Address) => {
        this.updateAddressForm = new FormGroup({
          id: new FormControl(addrId, []),
          hoTen: new FormControl(addrRes.hoTen, [
            Validators.required,
            Validators.pattern("^[a-zA-ZÀ-ỹ\\s]+$"),
            this.customRequiredValidator,
          ]),
          sdt: new FormControl(addrRes.sdt, [
            Validators.required,
            Validators.pattern("^(0[1-9][0-9]{8})$"),
            this.customRequiredValidator,
          ]),
          tinh: new FormControl(addrRes.tinh, [Validators.required]),
          huyen: new FormControl(addrRes.huyen, [Validators.required]),
          xa: new FormControl(addrRes.xa, [Validators.required]),
          duong: new FormControl(addrRes.duong, [
            Validators.required,
            Validators.pattern("^[a-zA-ZÀ-ỹ0-9-_/.\\s]+$"),
            this.customRequiredValidator,
          ]),
        });
        this.getAllDistrictsByProvince("update");
        this.getAllWardsByDistrict("update");
      },
      error: (err: any) => {},
    });
  }

  // 11
  public deleteAddress(addrId: number): void {
    Swal.fire({
      title: "Xóa địa chỉ này?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.addressService.deleteAddress(addrId).subscribe({
          next: () => {
            this.notifService.success("Địa chỉ đã được xóa!");
            this.getAllAddresses();
          },
          error: (errorRes: HttpErrorResponse) => {
            this.notifService.error(errorRes.error.message);
          },
        });
      }
    });
  }

  // 12
  public updateAddress(): void {
    Swal.fire({
      title: "Cập nhật địa chỉ?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        if (this.updateAddressForm.invalid) {
          this.notifService.warning("Vui lòng điền đầy đủ thông tin!");
          return;
        }

        let trimmedHoTen = this.updateAddressForm.get("hoTen").value.trim();
        this.updateAddressForm.get("hoTen")?.setValue(trimmedHoTen);

        let trimmedDiaChi = this.updateAddressForm.get("duong").value.trim();
        this.updateAddressForm.get("duong")?.setValue(trimmedDiaChi);

        this.addressService
          .updateAddress(
            this.updateAddressForm.get("id").value,
            this.updateAddressForm.value
          )
          .subscribe({
            next: () => {
              this.getAllAddresses();
              this.notifService.success("Cập nhật thành công!");
              this.isUpdateAddressModalShow = false;
              this.initUpdateAddressForm();
            },
            error: (errorRes: HttpErrorResponse) => {
              this.notifService.error(errorRes.error.message);
            },
          });
      }
    });
  }

  // private functions
  // 1
  private getAllAddresses(): void {
    const loggedCust = this.authService.getCustomerFromStorage();
    this.addressService.getAllAddressOf1Customer(loggedCust.id).subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }

  // 2
  private initAddAddressForm(): void {
    this.addAddressForm = new FormGroup({
      hoTen: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ỹ\\s]+$"),
        this.customRequiredValidator,
      ]),
      sdt: new FormControl("", [
        Validators.required,
        Validators.pattern("^(0[1-9][0-9]{8})$"),
        this.customRequiredValidator,
      ]),
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      duong: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ỹ0-9-_/.\\s]+$"),
        this.customRequiredValidator,
      ]),
      macDinh: new FormControl(false),
      custId: new FormControl("", [Validators.required]),
    });
  }

  // 3
  private getAllProvinces(): void {
    this.districts = [];
    this.wards = [];
    this.giaoHangNhanhService.getAllProvince().subscribe({
      next: (resp) => {
        this.provinces = resp.data;
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 4
  private customRequiredValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }

  // 5
  private initUpdateAddressForm(): void {
    this.updateAddressForm = new FormGroup({
      id: new FormControl("", []),
      hoTen: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ỹ\\s]+$"),
        this.customRequiredValidator,
      ]),
      sdt: new FormControl("", [
        Validators.required,
        Validators.pattern("^(0[1-9][0-9]{8})$"),
        this.customRequiredValidator,
      ]),
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      duong: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ỹ0-9-_/.\\s]+$"),
        this.customRequiredValidator,
      ]),
    });
  }
}
