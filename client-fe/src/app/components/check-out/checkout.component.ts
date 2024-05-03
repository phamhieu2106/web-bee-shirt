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
import { OnlineOrderRequest } from "src/app/model/interface/online-order-request.interface";
import { OrderDetailsReq } from "src/app/model/interface/order-details-req.interface";
import { OrderService } from "src/app/service/order.service";
import { DiscountService } from "src/app/service/discount.service";
import { Discount } from "src/app/model/class/discount.class";
import { SaleEventService } from "src/app/service/sale-event.service";
import { SaleEvent } from "src/app/model/class/sale-event.class";
import { AddAddressReq } from "src/app/model/interface/add-address-req.interface";
import { WebSocketService } from "src/app/service/web-socket.service";
import { Order } from "src/app/model/class/order.class";
import { NotifService } from "src/app/service/notif.service";
import { AddNotificationReq } from "src/app/model/interface/add-notifi-req.interface";
import { AddressShipFee } from "src/app/model/class/address-ship-fee.class";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent {
  public addresses: Address[] = [];
  public defaultAddr: Address;
  public loggedCust: Customer;

  public cartItems: CartItem[] = [];
  public cartItemQuantity: number;

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

  public provincesForShipFee: any[];
  public districtsForShipFee: any[];
  public wardsForShipFee: any[];
  public provinceIdForShipFee: number;
  public districtIdForShipFee: number;
  public wardIdForShipFee: number;

  public discounts: Discount[] = [];
  public selectedDiscount: Discount;

  public realPrice: number = 0;
  public salePrice: number = 0;
  public discountPrice: number = 0;
  public shipPrice: number = 0;
  public finalPrice: number = 0;

  public paymentMethod = true;
  public note: string;

  public isLoadding = false;
  public overlayText: string = "";

  // constructor, ngOn
  constructor(
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private ghnService: GiaoHangNhanhService,
    private addressService: AddressService,
    private authService: AuthenticationService,
    private notifService: NotificationService,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private discountService: DiscountService,
    private saleEventService: SaleEventService,
    private webSocketService: WebSocketService,
    private notifService2: NotifService
  ) {}

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.loggedCust = this.authService.getCustomerFromStorage();

    this.cartService.cartItemsOfLoggedUser.subscribe(
      (cartItems: CartItem[]) => {
        this.cartItems = cartItems;

        this.realPrice = this.getRealPrice();
        this.salePrice = this.getSalePrice();
        this.getDiscountsForLoggedCheckOut();
      }
    );

    this.cartService.cartItemsQuantityOfLoggedUser.subscribe(
      (quantity: number) => {
        this.cartItemQuantity = quantity;
      }
    );

    this.getAllProvinces();
    this.getAllProvincesForShipFee();
    this.getCartItemsFromLoggedCustomer();
    this.initAddAddressForm();
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
        this.turnOnOverlay("vui long doi");
        this.addressService.setDefaultAddress(addressId).subscribe({
          next: (defaultAddr: Address) => {
            // gán địa chỉ mặc định mới
            this.defaultAddr = defaultAddr;

            // cập nhật lại thuộc tính 'macDinh' cho các address trong list
            this.addresses = this.addresses.map((addr: Address) => {
              if (addr.id === defaultAddr.id) {
                addr.macDinh = true;
              } else {
                addr.macDinh = false;
              }
              return addr;
            });
            this.notifService.success("Cập nhật địa chỉ mặc định thành công!");
            setTimeout(() => {
              this.fillData();
              this.turnOffOverlay("");
            });
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
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
        if (this.addAddressForm.invalid) {
          this.notifService.error("Vui lòng nhập đầy đủ thông tin!");
          return;
        }

        const req: AddAddressReq = {
          hoTen: this.addAddressForm.get("hoTen").value.trim(),
          sdt: this.addAddressForm.get("sdt").value,
          tinh: this.addAddressForm.get("tinh").value,
          huyen: this.addAddressForm.get("huyen").value,
          xa: this.addAddressForm.get("xa").value,
          duong: this.addAddressForm.get("duong").value.trim(),
          macDinh: this.addAddressForm.get("macDinh").value,
          custId: this.loggedCust.id,
        };

        this.addressService.addAddress(req).subscribe({
          next: () => {
            this.initAddAddressForm();
            this.getAllAddressOfLoggedCust();
            this.notifService.success("Thêm địa chỉ mới thành công!");

            // open/close modals
            this.isAddAddressModalOpen = false;
            this.isAddressesModalOpen = true;
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
          },
        });
      }
    });
  }

  // select address event functions
  // 8. get districts by select province
  public getAllDistrictsByProvince(): void {
    this.wards = [];
    this.getProvinceId();
    this.ghnService.getAllDistrictByProvinceID(this.provinceId).subscribe({
      next: (resp: any) => {
        this.districts = resp.data;
        this.addAddressForm.get("tinh").setValue(this.getProvinceName());
      },
    });
  }

  // 8.1
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

  // 8.3
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

  // 9. get wards by select district
  public getAllWardsByDistrict(): void {
    this.getDistrictId();
    this.ghnService.getAllWardByDistrictID(this.districtId).subscribe({
      next: (resp: any) => {
        this.wards = resp.data;
        this.addAddressForm.get("huyen").setValue(this.getDistrictName());
      },
    });
  }

  // 9.1
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

  // 9.2
  private getDistrictName(): string {
    let districtName = this.addAddressForm.get("huyen").value;
    this.districts.forEach((d) => {
      if (d.DistrictID == this.districtId) {
        districtName = d.DistrictName;
      }
    });
    return districtName;
  }

  // 10
  public checkProvinceSelection(): void {
    if (!this.provinceId) {
      this.notifService.warning("Vui lòng chọn tỉnh/thành phố trước!");
      return;
    }
  }

  // 11
  public checkDistrictSelection(): void {
    if (!this.provinceId || !this.districtId) {
      this.notifService.warning("Vui lòng chọn quận/huyện trước!");
      return;
    }
  }
  // end: select address event functions

  // 12
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
        this.turnOnOverlay("Hệ thống đang xử lý...");

        if (!this.paymentMethod) {
          const data = {
            vnp_Amount:
              this.realPrice -
              this.salePrice -
              this.discountPrice +
              this.shipPrice,
          };
          this.orderService.paymentWithVNPay(data).subscribe({
            next: (url: string) => {
              window.location.replace(url);
              const hoaDonChiTiets: OrderDetailsReq[] =
                this.mapCartItemsToOrderDetails();

              let req: OnlineOrderRequest = {
                tongTien: this.realPrice - this.salePrice,
                tienGiam: this.discountPrice,
                phiVanChuyen: this.shipPrice,
                paymentMethod: this.paymentMethod,
                hoaDonChiTiets: hoaDonChiTiets,
                khachHangId: this.loggedCust?.id,
                phieuGiamGiaId: this.selectedDiscount?.id,
                tenNguoiNhan: this.defaultAddr.hoTen,
                sdtNguoiNhan: this.defaultAddr.sdt,
                emailNguoiNhan: this.loggedCust.email,
                diaChiNguoiNhan: this.formatAddress(this.defaultAddr),
                ghiChu: this.note,
              };
              localStorage.setItem("onlineOrderReq", JSON.stringify(req));
              this.turnOffOverlay("");
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        } else {
          const hoaDonChiTiets: OrderDetailsReq[] =
            this.mapCartItemsToOrderDetails();

          let req: OnlineOrderRequest = {
            tongTien: this.realPrice - this.salePrice,
            tienGiam: this.discountPrice,
            phiVanChuyen: this.shipPrice,
            paymentMethod: this.paymentMethod,
            hoaDonChiTiets: hoaDonChiTiets,
            khachHangId: this.loggedCust?.id,
            phieuGiamGiaId: this.selectedDiscount?.id,
            tenNguoiNhan: this.defaultAddr.hoTen,
            sdtNguoiNhan: this.defaultAddr.sdt,
            emailNguoiNhan: this.loggedCust.email,
            diaChiNguoiNhan: this.formatAddress(this.defaultAddr),
            ghiChu: this.note,
          };

          // call api
          this.orderService.placeOrderOnline(req).subscribe({
            next: (order: Order) => {
              this.notifService.success("Đặt hàng thành công!");
              this.router.navigate([`/profile/order-tracking/${order.ma}`]);
              this.cartService.updateCartItemsOfLoggedUser([]);
              this.cartService.updateCartItemsQuantityOfLoggedUser(0);
              this.sendMessage(order);
              this.turnOffOverlay("");
            },
            error: (errResp: HttpErrorResponse) => {
              this.notifService.error(errResp.error.message);
              this.turnOffOverlay("");
            },
          });
        }
      }
    });
  }

  // 12.1
  private mapCartItemsToOrderDetails(): OrderDetailsReq[] {
    let result: OrderDetailsReq[] = [];
    for (let item of this.cartItems) {
      let price = item.spct.giaBan;
      if (item.spct.saleEvent) {
        price =
          (item.spct.giaBan * (100 - item.spct.saleEvent.giaTriPhanTram)) / 100;
      }
      let orderDetails: OrderDetailsReq = {
        id: null,
        soLuong: item.soLuong,
        giaBan: price,
        giaNhap: item.spct.giaNhap,
        sanPhamChiTietId: item.spct.id,
      };
      result.push(orderDetails);
    }
    return result;
  }

  // 13
  public getDiscountTitle(discount: Discount): string {
    if (discount?.kieu === 0) {
      return ` Giảm ${discount?.giaTri}% cho đơn  từ ${this.formatPrice(
        discount?.dieuKienGiam
      )} Tối đa ${this.formatPrice(discount.giaTriMax)}`;
    } else {
      return ` Giảm ${this.formatPrice(
        discount?.giaTri
      )} cho đơn  từ ${this.formatPrice(discount?.dieuKienGiam)}`;
    }
  }

  // 14
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

  // 15
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
  private getAllAddressOfLoggedCust(): void {
    this.addressService.getAllAddressOf1Customer(this.loggedCust.id).subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;
        this.defaultAddr = addresses.filter(
          (address: Address) => address.macDinh
        )[0];
        this.fillData();
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 2
  private getCartItemsFromLoggedCustomer(): void {
    this.cartService
      .getCartItemsOfLoggedCustomer(this.loggedCust.id)
      .subscribe({
        next: (cartItems: CartItem[]) => {
          // calculate prices
          this.realPrice = this.getRealPrice();
          this.salePrice = this.getSalePrice();
          this.discountPrice = this.getDiscountPrice();
          this.finalPrice = this.getFinalPrice();

          // get product for prod-details
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
                  this.cartItems = cartItems;
                  this.cartItemQuantity = cartItems.length;
                  this.cartService.updateCartItemsOfLoggedUser(cartItems);
                  this.cartService.updateCartItemsQuantityOfLoggedUser(
                    cartItems.length
                  );
                }
              });
            },
          });

          // get sale events for prod-details
          let observables2 = [];
          for (let item of cartItems) {
            observables2.push(
              this.saleEventService.getSaleEventOfProdDetails(item.spct.id)
            );
          }
          forkJoin(observables2).subscribe({
            next: (values: SaleEvent[]) => {
              values.forEach((v, index) => {
                cartItems[index].spct.saleEvent = v;
                if (index === cartItems.length - 1) {
                  this.cartItems = cartItems;
                  this.cartItemQuantity = cartItems.length;

                  this.cartService.updateCartItemsOfLoggedUser(cartItems);
                  this.cartService.updateCartItemsQuantityOfLoggedUser(
                    cartItems.length
                  );
                  this.salePrice = this.getSalePrice();
                  this.getDiscountsForLoggedCheckOut();
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

  // 3
  private getDiscountsForLoggedCheckOut(): void {
    this.discountService
      .getDiscountsForLoggedCheckOut(
        this.realPrice - this.salePrice,
        this.loggedCust.id
      )
      .subscribe({
        next: (discounts: Discount[]) => {
          this.discounts = discounts;
          if (this.discounts.length > 0) {
            this.initSelectedDiscounts();
          } else {
            this.selectedDiscount = null;
          }
          this.discountPrice = this.getDiscountPrice();
          this.finalPrice = this.getFinalPrice();
        },
        error: (errorRes: HttpErrorResponse) => {
          this.notifService.error(errorRes.error.message);
        },
      });
  }

  // 4
  private initSelectedDiscounts(): void {
    if (this.discounts.length === 1) {
      // khi danh sách phiếu gg chỉ có 1
      this.selectedDiscount = this.discounts[0];
      if (this.selectedDiscount) {
        this.selectedDiscount.isSelected = true;
      }
    } else {
      // khi số lượng phiếu giảm giá cho lớn hơn 1 => đi tìm phiếu giảm giá tốt nhất
      let reducePrice = 0;
      for (let d of this.discounts) {
        let reduceInForLoop = 0;
        if (d.kieu === 0) {
          let temp = Math.round(
            (d.giaTri * (this.realPrice - this.salePrice)) / 100
          );
          reduceInForLoop = temp > d.giaTriMax ? d.giaTriMax : temp;
        } else if (d.kieu === 1) {
          reduceInForLoop = d.giaTri;
        }

        if (reducePrice < reduceInForLoop) {
          reducePrice = reduceInForLoop;
          this.selectedDiscount = d;
        }
      }
      if (this.selectedDiscount) {
        this.selectedDiscount.isSelected = true;
      }
    }
    this.discountPrice = this.getDiscountPrice();
    this.finalPrice = this.getFinalPrice();
  }

  // 5
  private initAddAddressForm(): void {
    this.addAddressForm = new FormGroup({
      hoTen: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ỹ\\s]+$"),
        this.customNotBlankValidator,
      ]),
      sdt: new FormControl("", [
        Validators.required,
        Validators.pattern("^(0[1-9][0-9]{8})$"),
        this.customNotBlankValidator,
      ]),
      tinh: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
      huyen: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
      xa: new FormControl("", [
        Validators.required,
        this.customNotBlankValidator,
      ]),
      duong: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-ZÀ-ỹ0-9-_/.\\s]+$"),
        this.customNotBlankValidator,
      ]),
      macDinh: new FormControl(false),
    });
  }

  // 6
  private customNotBlankValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }

  // 7
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

  // 8
  private getAllProvincesForShipFee(): void {
    this.districtsForShipFee = [];
    this.wardsForShipFee = [];
    this.ghnService.getAllProvince().subscribe({
      next: (resp) => {
        this.provincesForShipFee = resp.data;
        this.getAllAddressOfLoggedCust();
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // calculate prices
  // 9
  private getRealPrice(): number {
    let result: number = 0;
    for (const item of this.cartItems) {
      result += item.spct.giaBan * item.soLuong;
    }
    return result;
  }

  // 10
  private getSalePrice(): number {
    let result: number = 0;
    for (const item of this.cartItems) {
      if (item.spct.saleEvent) {
        result +=
          (item.spct.giaBan *
            item.spct.saleEvent.giaTriPhanTram *
            item.soLuong) /
          100;
      }
    }
    return result;
  }

  // 11
  private getDiscountPrice(): number {
    if (this.selectedDiscount) {
      if (this.selectedDiscount.kieu === 0) {
        let temp =
          (this.selectedDiscount.giaTri * (this.realPrice - this.salePrice)) /
          100;

        temp =
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

  // 12
  private getFinalPrice(): number {
    return (
      this.realPrice - this.salePrice - this.discountPrice + this.shipPrice
    );
  }

  // 13
  private async getShipPrice() {
    const addrShip: AddressShipFee = {
      tinh: this.defaultAddr.tinh,
      tinhId: this.provinceIdForShipFee,
      huyen: this.defaultAddr.huyen,
      huyenId: this.districtIdForShipFee,
      xa: this.defaultAddr.xa,
      xaCode: `${this.wardIdForShipFee}`,
      cuThe: this.defaultAddr.duong,
      duKien: new Date(),
      phiVanChuyen: 0,
      service_id: 0,
      service_type_id: 0,
    };

    try {
      const shopId = 190872;
      const from_district = 3440; // Xuân Phương - Nam từ Liêm
      const respService = await this.ghnService
        .getService(shopId, from_district, this.districtIdForShipFee)
        .toPromise();

      const service_id = respService.data[0].service_id;
      addrShip.service_id = service_id;

      const respFee = await this.ghnService
        .getFee(addrShip, service_id)
        .toPromise();
      this.shipPrice = respFee.data.total;
      this.finalPrice = this.getFinalPrice();
    } catch (error) {
      console.log("Lỗi tính phí vận chuyển");
    }
  }
  // end: calculate prices

  // 14
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 15
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }

  // 16
  private sendMessage(order: Order): void {
    const newNotif: AddNotificationReq = {
      type: "NEW_ORDER_CREATED",
      content: `Bạn có đơn hàng mới từ khách hàng ${this.loggedCust.hoTen}!`,
      relatedUrl: `/hoa-don/chi-tiet-hoa-don/${order.id}`,
      custId: null,
    };
    this.notifService2.createNewNotification(newNotif).subscribe({
      next: (data) => {
        this.webSocketService.sendMessage("Bạn có đơn hàng mới!");
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // get data of addres and get ship price
  // 17
  async fillData() {
    try {
      await this.turnOnOverlay("Vui lòng chờ vài giây...");

      // Tìm Tỉnh, Huyện, Xã
      await this.findTinhId();
      await this.getAllHuyenByTinh();
      await this.findHuyenId();
      await this.getAllXaByHuyen();
      await this.findXaId();

      // Xử lý hoàn thành
      this.getShipPrice();
      this.turnOffOverlay("");
    } catch (error) {
      console.log("Lỗi trong fillData:", error);
      this.turnOffOverlay("Có lỗi xảy ra");
    }
  }

  // 17.1
  async findTinhId() {
    const tinh = this.provincesForShipFee.find(
      (element) => element.ProvinceName === this.defaultAddr.tinh
    );
    if (tinh) {
      this.provinceIdForShipFee = tinh.ProvinceID;
    }
  }

  // 17.2
  async getAllHuyenByTinh() {
    try {
      const resp = await this.ghnService
        .getAllDistrictByProvinceID(this.provinceIdForShipFee)
        .toPromise();
      this.districtsForShipFee = resp.data;
      // this.diaChiVaPhiVanChuyen.tinh = this.getTenTinh();
    } catch (error) {
      console.log("Lỗi trong getAllHuyenByTinh:", error);
    }
  }

  // 17.3
  async findHuyenId() {
    const huyen = this.districtsForShipFee.find(
      (element) => element.DistrictName === this.defaultAddr.huyen
    );
    if (huyen) {
      this.districtIdForShipFee = huyen.DistrictID;
    }
  }

  // 17.4
  async getAllXaByHuyen() {
    try {
      const resp = await this.ghnService
        .getAllWardByDistrictID(this.districtIdForShipFee)
        .toPromise();
      this.wardsForShipFee = resp.data;
    } catch (error) {
      console.log("Lỗi trong getAllXaByHuyen:", error);
    }
  }

  // 17.5
  async findXaId() {
    const xa = this.wardsForShipFee.find(
      (element) => element.WardName === this.defaultAddr.xa
    );
    if (xa) {
      this.wardIdForShipFee = xa.WardCode;
    }
  }
}
