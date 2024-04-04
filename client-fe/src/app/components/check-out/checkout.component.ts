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
  public isDiscountModalOpen: boolean = false;

  public addAddressForm: FormGroup;
  public provinces: any[];
  public districts: any[];
  public wards: any[];
  public provinceId: number;
  public districtId: number;
  public wardId: number;

  public discounts: Discount[] = [];
  public selectedDiscount: Discount;

  public realPrice: number = 0;
  public salePrice: number = 0;
  public discountPrice: number = 0;
  public shipPrice: number = 0;
  public finalPrice: number = 0;

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
  }

  // public functions
  // 1
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 2
  public toggleAddressesModal(value: boolean): void {
    this.isAddressesModalOpen = value;
  }

  // 3
  public toggleDiscountsModal(value: boolean): void {
    this.isDiscountModalOpen = value;
  }

  // 4
  public toggleAddAddressModal(value: boolean): void {
    this.isAddressesModalOpen = false;
    this.isAddAddressModalOpen = value;
    if (!value) {
      this.initAddAddressForm();
    }
  }

  // 5
  public formatAddress(address: Address): string {
    return `${address.duong}, ${address.xa}, ${address.huyen}, ${address.tinh}`;
  }

  // 6
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

  // 7
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

  // select address event functions
  // get districts by province
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

  // get wards by district
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
  // end: select address event functions

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
        const tongTien = this.finalPrice;
        const tienGiam = this.getDiscountPrice();
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
          tienGiam: 0,
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

  //
  public getDiscountTitle(discount: Discount): string {
    if (discount?.kieu === 0) {
      return ` Giảm ${discount?.giaTri}% cho đơn  từ ${this.formatPrice(
        discount?.dieuKienGiam
      )}`;
    } else {
      return ` Giảm ${this.formatPrice(
        discount?.giaTri
      )}k cho đơn  từ ${this.formatPrice(discount?.dieuKienGiam)}`;
    }
  }

  //
  public changeDiscount(discountId: number): void {
    this.discounts = this.discounts.map((d: Discount) => {
      if (d.id === discountId) {
        this.selectedDiscount = d;
        d.isSelected = true;
      } else {
        d.isSelected = false;
      }
      return d;
    });
    this.discountPrice = this.getDiscountPrice();
    this.finalPrice = this.getFinalPrice();
  }

  public checkBestDiscount(): boolean {
    for (let d of this.discounts) {
      let reduceInFor = 0;
      if (d.kieu === 0) {
        let temp = Math.round(
          (d.giaTri * (this.realPrice - this.salePrice)) / 100
        );
        reduceInFor = temp > d.giaTriMax ? d.giaTriMax : temp;
      } else if (d.kieu === 1) {
        reduceInFor = d.giaTri;
      }
      if (this.discountPrice < reduceInFor) {
        return false;
      }
    }
    return true;
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
      next: (cartItems: CartItem[]) => {
        // calculate prices
        this.realPrice = this.getRealPrice(cartItems);
        // this.calculateSalePrice(cartItems);
        this.salePrice = this.getSalePrice();
        this.finalPrice = this.getFinalPrice();
        this.getAllDiscounts();

        let observables = [];
        for (let item of cartItems) {
          observables.push(
            this.productService.getProductByProductDetails(item.spct.id)
          );
        }
        forkJoin(observables).subscribe({
          next: (productsRes: SanPham[]) => {
            productsRes.forEach((productRes, index) => {
              cartItems[index].spct.sanPham = productRes;
              if (index === cartItems.length - 1) {
                this.cartItems2 = cartItems;
                this.cartItemQuantity2 = cartItems.length;
                this.cartService.updateCartItemsOfLoggedUser(cartItems);
                this.cartService.updateCartItemsQuantityOfLoggedUser(
                  cartItems.length
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

  // 3.1
  private getAllDiscounts(): void {
    this.discountService
      .getDiscountsForCheckOut(
        this.realPrice - this.salePrice,
        this.loggedCust.id
      )
      .subscribe({
        next: (discounts: Discount[]) => {
          this.discounts = discounts;
          this.initSelectedDiscounts();
        },
        error: (errorRes: HttpErrorResponse) => {
          this.notifService.error(errorRes.error.message);
        },
      });
  }

  // 3.2
  private initSelectedDiscounts(): void {
    if (this.discounts.length === 1) {
      this.selectedDiscount = this.discounts[0];
      this.selectedDiscount.isSelected = true;
    } else {
      let reducedPrice = 0;
      for (let d of this.discounts) {
        let reduceInFor = 0;
        if (d.kieu === 0) {
          let temp = Math.round(
            (d.giaTri * (this.realPrice - this.salePrice)) / 100
          );
          reduceInFor = temp > d.giaTriMax ? d.giaTriMax : temp;
        } else if (d.kieu === 1) {
          reduceInFor = d.giaTri;
        }

        if (reducedPrice < reduceInFor) {
          reducedPrice = reduceInFor;
          this.selectedDiscount = d;
        }
      }
      this.selectedDiscount.isSelected = true;
    }
    this.discountPrice = this.getDiscountPrice();
    this.finalPrice = this.getFinalPrice();
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

  // calculate prices
  private getRealPrice(cartItems: CartItem[]): number {
    let result: number = 0;
    for (const item of cartItems) {
      result += item.spct.giaBan * item.soLuong;
    }
    return result;
  }

  private getSalePrice(): number {
    return 0;
  }

  private getDiscountPrice(): number {
    if (this.selectedDiscount) {
      if (this.selectedDiscount.kieu === 0) {
        let temp =
          (this.selectedDiscount.giaTri * (this.realPrice - this.salePrice)) /
          100;
        this.discountPrice =
          temp > this.selectedDiscount.giaTriMax
            ? this.selectedDiscount.giaTriMax
            : temp;
        return temp;
      } else if (this.selectedDiscount.kieu === 1) {
        return this.selectedDiscount.giaTri;
      }
    }
    return 0;
  }

  private getShipPrice(): number {
    return 0;
  }

  private getFinalPrice(): number {
    return (
      this.realPrice - this.salePrice - this.discountPrice + this.shipPrice
    );
  }
  // end: calculate prices
}
