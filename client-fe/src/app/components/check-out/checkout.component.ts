import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
import { PlaceOrderRequest } from "src/app/model/interface/place-order-request.interface";
import { OrderDetailsReq } from "src/app/model/interface/order-details-req.interface";
import { PaymentReq } from "src/app/model/interface/payment-req.interface";
import { AddressShipFee } from "src/app/model/class/address-ship-fee.class";
import { OrderService } from "src/app/service/order.service";
import { DiscountService } from "src/app/service/discount.service";
import { Discount } from "src/app/model/class/discount.class";

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

  public discounts: Discount[] = [];
  public selectedDiscount: Discount;

  // constructor, ngOn
  constructor(
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private giaoHangNhanhService: GiaoHangNhanhService,
    private addressService: AddressService,
    private authService: AuthenticationService,
    private notifService: NotificationService,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private discountService: DiscountService
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
    this.getAllDiscounts();
  }

  // public functions
  // 1
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 2
  public formatRealPrice(): any {
    return this.formatPrice(this.calculateRealPrice());
  }

  private calculateRealPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems2) {
      totalPrice += item.spct.giaBan * item.soLuong;
    }
    return totalPrice;
  }

  // 3
  public formatSalePrice(): any {
    return this.formatPrice(this.calculateSalePrice());
  }

  private calculateSalePrice(): number {
    return 0;
  }

  // 4
  public formatDiscountPrice(): any {
    return this.formatPrice(this.calculateDiscountPrice());
  }

  private calculateDiscountPrice(): number {
    return 0;
  }

  // 5
  public formatShipPrice(): any {
    return this.formatPrice(this.calculateShipPrice());
  }

  private calculateShipPrice(): number {
    return 0;
  }

  // 6
  public formatFinalPrice(): any {
    return this.formatPrice(this.calculateFinalPrice());
  }

  public calculateFinalPrice(): number {
    return (
      this.calculateRealPrice() -
      this.calculateSalePrice() -
      this.calculateDiscountPrice() +
      this.calculateShipPrice()
    );
  }

  // 7
  public toggleAddressesModal(value: boolean): void {
    this.isAddressesModalOpen = value;
  }

  //
  public toggleAddAddressModal(value: boolean): void {
    this.isAddressesModalOpen = false;
    this.isAddAddressModalOpen = value;
    if (!value) {
      this.initAddAddressForm();
    }
  }

  //
  public formatAddress(address: Address): string {
    return `${address.duong}, ${address.xa}, ${address.huyen}, ${address.tinh}`;
  }

  //
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

  //
  public addAddress(): void {
    Swal.fire({
      title: "Thêm mới địa chỉ?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
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

  public checkProvinceSelection(): void {
    if (!this.provinceId) {
      this.notifService.warning("Vui lòng chọn tỉnh/thành phố trước!");
      return;
    }
  }

  public checkDistrictSelection(): void {
    if (!this.provinceId) {
      this.notifService.warning("Vui lòng chọn quận/huyện trước!");
      return;
    }
  }

  //
  public checkOut(): void {
    Swal.fire({
      title: "Xác nhận thanh toán?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const tongTien = this.calculateRealPrice();
        const tienGiam = this.calculateDiscountPrice();
        const phiVanChuyen = 0;
        const loaiHoaDon = "GIAO_HANG";
        const hoaDonChiTiets: OrderDetailsReq[] =
          this.mapCartItemsToOrderDetails();
        const nhanVienId = 0;
        const khachHangId = this.loggedCust.id;
        const phieuGiamGiaId = 0;
        const thanhToans: PaymentReq[] = [];
        const tenNguoiNhan = this.loggedCust.hoTen;
        const sdtNguoiNhan = this.loggedCust.sdt;
        const emailNguoiNhan = this.loggedCust.email;
        const diaChiNguoiNhan = this.formatAddress(this.defaultAddr);
        const ghiChu = "";
        let diaChiVaPhiVanChuyen: AddressShipFee;

        let req: PlaceOrderRequest = {
          tongTien: tongTien,
          tienGiam: tienGiam,
          phiVanChuyen: phiVanChuyen,
          loaiHoaDon: loaiHoaDon,
          hoaDonChiTiets: hoaDonChiTiets,
          nhanVienId: nhanVienId,
          khachHangId: khachHangId,
          phieuGiamGiaId: phieuGiamGiaId,
          thanhToans: thanhToans,
          tenNguoiNhan: tenNguoiNhan,
          sdtNguoiNhan: sdtNguoiNhan,
          emailNguoiNhan: emailNguoiNhan,
          diaChiNguoiNhan: diaChiNguoiNhan,
          ghiChu: ghiChu,
          diaChiVaPhiVanChuyen: diaChiVaPhiVanChuyen,
        };

        this.orderService.placeOrder(req).subscribe({
          next: (resp: any) => {},
          error: (errRes: HttpErrorResponse) => {
            this.notifService.error(errRes.error.message);
          },
        });
      }
    });
  }

  private mapCartItemsToOrderDetails(): OrderDetailsReq[] {
    let result: OrderDetailsReq[] = [];
    for (let item of this.cartItems2) {
      let orderDetails: OrderDetailsReq = {
        soLuong: item.soLuong,
        giaBan: item.spct.giaBan,
        giaNhap: item.spct.giaNhap,
        sanPhamChiTietId: item.spct.id,
      };
      result.push(orderDetails);
    }
    return result;
  }

  // private functions
  // 1
  private checkLoggedIn(): void {
    const isLoggedIn: boolean = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.notifService.warning("Bạn cần đăng nhập để vào được trang này!");
      this.router.navigate(["/log-in"]);
    }
  }
  // 2
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

  // 4
  private initAddAddressForm(): void {
    this.addAddressForm = new FormGroup({
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),
      macDinh: new FormControl(false),
    });
  }

  // 5
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

  private getAllDiscounts(): void {
    this.discountService
      .getDiscountsForCheckOut(
        this.loggedCust.id,
        this.calculateRealPrice() - this.calculateSalePrice()
      )
      .subscribe({
        next: (discounts: Discount[]) => {
          this.discounts = discounts;
        },
        error: (errorRes: HttpErrorResponse) => {
          this.notifService.error(errorRes.error.message);
        },
      });
  }

  private initSelectedDiscounts(): void {
    // for (let d of this.discounts) {
    //   const reducedPrice = 0;
    //    if (d.)
    // }
  }
}
