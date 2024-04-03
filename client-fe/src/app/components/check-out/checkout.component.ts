import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";

import Swal, { SweetAlertResult } from "sweetalert2";

import { Address } from "src/app/model/class/address.class";
import { CartItem } from "src/app/model/class/cart-item.class";
import { Customer } from "src/app/model/class/customer.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { AddressService } from "src/app/service/address.service";
import { AuthenticationService } from "src/app/service/authentication.service";
import { CartService } from "src/app/service/cart.service";
import { NotificationService } from "src/app/service/notification.service";
import { ProductService } from "src/app/service/product.service";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent {
  public addresses: Address[] = [];
  public defaultAddr: Address;
  public loggedCust: Customer;
  public cartItems2: CartItem[] = [];
  public cartItemQuantity2: number;
  public isAddressesModalOpen: boolean = false;
  public isAddAddressModalOpen: boolean = false;

  public addAddressForm: FormGroup;
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
    private router: Router,
    private notifService: NotificationService,
    private cartService: CartService,
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    private giaoHangNhanhService: GiaoHangNhanhService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemsOfLoggedUser.subscribe(
      (cartItems: CartItem[]) => {
        this.cartItems2 = cartItems;
      }
    );

    this.cartService.cartItemsQuantityOfLoggedUser.subscribe((data: number) => {
      this.cartItemQuantity2 = data;
    });

    this.loggedCust = this.authService.getCustomerFromStorage();

    this.checkLoggedIn();
    this.getAllAddressOfLoggedCust();
    this.getCartItemsFromLoggedCustomer();
    this.initAddAddressForm();
    this.getAllProvinces();
  }

  // public functions
  // 1
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 2
  public calculateRealPrice(): any {
    let totalPrice = 0;
    for (const item of this.cartItems2) {
      totalPrice += item.spct.giaBan * item.soLuong;
    }
    return this.formatPrice(totalPrice);
  }

  // 3
  public calculateDiscountPrice(): any {
    let discountPrice = 0;
    return this.formatPrice(0);
  }

  // 4
  public calculateFinalPrice(): any {
    let totalPrice = 0;
    for (const item of this.cartItems2) {
      totalPrice += item.spct.giaBan * item.soLuong;
    }
    let discountPrice = 0;
    return this.formatPrice(totalPrice - discountPrice);
  }

  // 5
  public toggleAddressesModal(value: boolean): void {
    this.isAddressesModalOpen = value;
  }

  // 6
  public toggleAddAddressModal(value: boolean): void {
    this.isAddressesModalOpen = false;
    this.isAddAddressModalOpen = value;
  }

  // 7
  public formatAddress(address: Address): string {
    return `${address.duong}, ${address.xa}, ${address.huyen}, ${address.tinh}`;
  }

  // 8
  public setDefaultAddress(addressId: number): void {
    Swal.fire({
      title: "Cập nhật địa chỉ mặc định?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.addressService.setDefaultAddress(addressId).subscribe({
          next: (defaultAddr: Address) => {
            this.defaultAddr = defaultAddr;
            this.addresses = this.addresses.map((addr: Address) => {
              if (addr.id === defaultAddr.id) {
                addr.macDinh = true;
              } else {
                addr.macDinh = false;
              }
              return addr;
            });
            this.notifService.success("Cập nhật địa chỉ mặc định thành công!");
          },
          error: (errorRes: HttpErrorResponse) => {
            this.notifService.error(errorRes.error.message);
          },
        });
      }
    });
  }

  // address event functions
  // get All Districts By Province
  public getAllDistrictsByProvince(): void {
    this.wards = [];
    this.getProvinceId();
    this.giaoHangNhanhService
      .getAllDistrictByProvinceID(this.provinceId)
      .subscribe({
        next: (resp: any) => {
          this.districts = resp.data;
          this.addAddressForm.get("tinh").setValue(this.getProvinceName());
        },
      });
  }

  private getProvinceId(): void {
    for (let i = 0; i < this.provinces.length; i++) {
      const element = this.provinces[i];
      if (
        element.NameExtension.includes(this.addAddressForm.get("tinh").value)
      ) {
        this.provinceId = element.ProvinceID;
        break;
      }
    }
  }

  private getProvinceName(): string {
    let provinceName = this.addAddressForm.get("tinh").value;
    if (provinceName == null || provinceName == "") {
      this.provinces.forEach((p) => {
        if (p.ProvinceID == this.provinceId) {
          provinceName = p.ProvinceName;
        }
      });
    }
    return provinceName;
  }

  // get All Wards By District
  public getAllWardsByDistrict(): void {
    this.getDistrictId();
    this.giaoHangNhanhService
      .getAllWardByDistrictID(this.districtId)
      .subscribe({
        next: (resp: any) => {
          this.wards = resp.data;
          this.addAddressForm.get("huyen").setValue(this.getDistrictName());
        },
      });
  }

  private getDistrictId(): void {
    for (let i = 0; i < this.districts.length; i++) {
      const element = this.districts[i];
      if (
        element.NameExtension.includes(this.addAddressForm.get("huyen").value)
      ) {
        this.districtId = element.DistrictID;
        break;
      }
    }
  }

  private getDistrictName(): string {
    let districtName = this.addAddressForm.get("huyen").value;
    this.districts.forEach((d) => {
      if (d.DistrictID == this.districtId) {
        districtName = d.DistrictName;
      }
    });
    return districtName;
  }

  public addAddress(): void {
    this.addressService
      .addAddress(this.loggedCust.id, this.addAddressForm.value)
      .subscribe({
        next: () => {
          this.initAddAddressForm();
          this.notifService.success("Thêm địa chỉ thành công!");
          this.getAllAddressOfLoggedCust();

          // open/close modal
          this.isAddAddressModalOpen = false;
          this.isAddressesModalOpen = true;
        },
        error: (errRes: HttpErrorResponse) => {
          this.notifService.error(errRes.error.message);
        },
      });
  }

  // private functions
  //
  private checkLoggedIn(): void {
    const isLoggedIn: boolean = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.notifService.warning("Bạn cần đăng nhập để vào được trang này!");
      this.router.navigate(["/log-in"]);
    }
  }
  //
  private getAllAddressOfLoggedCust(): void {
    this.addressService.getAllAddressOf1Customer(this.loggedCust.id).subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;
        this.defaultAddr = addresses.filter(
          (address: Address) => address.macDinh
        )[0];
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 3
  private getCartItemsFromLoggedCustomer(): void {
    const loggedCus = this.authService.getCustomerFromStorage();
    this.cartService.getCartItemsOfLoggedCustomer(loggedCus.id).subscribe({
      next: (response: CartItem[]) => {
        let observables = [];
        for (let item of response) {
          observables.push(
            this.productService.getProductByProductDetails(item.spct.id)
          );
        }
        forkJoin(observables).subscribe({
          next: (productsRes: SanPham[]) => {
            productsRes.forEach((productRes, index) => {
              response[index].spct.sanPham = productRes;
              if (index === response.length - 1) {
                this.cartItems2 = response;
                this.cartItemQuantity2 = response.length;
                this.cartService.updateCartItemsOfLoggedUser(response);
                this.cartService.updateCartItemsQuantityOfLoggedUser(
                  response.length
                );
              }
            });
          },
        });
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }

  private initAddAddressForm(): void {
    this.addAddressForm = new FormGroup({
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),
      macDinh: new FormControl(false),
    });
  }

  private getAllProvinces(): void {
    this.districts = [];
    this.wards = [];
    this.giaoHangNhanhService.getAllProvince().subscribe({
      next: (resp) => {
        this.provinces = resp.data;
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }
}
