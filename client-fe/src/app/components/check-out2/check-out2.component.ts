import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Address } from "src/app/model/class/address.class";
import { CartItem } from "src/app/model/class/cart-item.class";
import { Customer } from "src/app/model/class/customer.class";
import { Discount } from "src/app/model/class/discount.class";
import { CartService } from "src/app/service/cart.service";
import { DiscountService } from "src/app/service/discount.service";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-check-out2",
  templateUrl: "./check-out2.component.html",
  styleUrls: ["./check-out2.component.css"],
})
export class CheckOut2Component {
  public addresses: Address[] = [];
  public defaultAddr: Address;
  public loggedCust: Customer;

  public cartItems: CartItem[] = [];
  public cartItemQuantity: number;

  public isAddressesModalOpen: boolean = false;
  public isAddAddressModalOpen: boolean = false;
  public isDiscountModalOpen: boolean = false;

  public addressForm: FormGroup;
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

  public paymentMethod = true;

  // constructor, ngOn
  constructor(
    private currencyPipe: CurrencyPipe,
    private cartService: CartService,
    private giaoHangNhanhService: GiaoHangNhanhService,
    private notifService: NotificationService,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemsInLocalStorage.subscribe(
      (cartItems: CartItem[]) => {
        this.cartItems = cartItems;

        this.realPrice = this.getRealPrice();
        this.salePrice = this.getSalePrice();
        this.getDiscountsForNoneLoggedCheckOut();
      }
    );

    this.cartService.cartItemsQuantityInLocalStorage.subscribe(
      (quantity: number) => {
        this.cartItemQuantity = quantity;
      }
    );

    this.getAllProvinces();
    this.initAddAddressForm();
  }

  // public functions
  // 1
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  //
  public toggleDiscountsModal(value: boolean): void {
    this.isDiscountModalOpen = value;
  }

  //
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

  //
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

  //
  public checkOut(): void {}

  // select address event functions
  // 8. get districts by select province
  public getAllDistrictsByProvince(): void {
    this.wards = [];
    this.getProvinceId();
    this.giaoHangNhanhService
      .getAllDistrictByProvinceID(this.provinceId)
      .subscribe({
        next: (resp: any) => {
          this.districts = resp.data;
          this.addressForm.get("tinh").setValue(this.getProvinceName());
        },
      });
  }

  // 8.1
  private getProvinceId(): void {
    for (let i = 0; i < this.provinces.length; i++) {
      const element = this.provinces[i];
      if (element.NameExtension.includes(this.addressForm.get("tinh").value)) {
        this.provinceId = element.ProvinceID;
        break;
      }
    }
  }

  // 8.3
  private getProvinceName(): string {
    let provinceName = this.addressForm.get("tinh").value;
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
    this.giaoHangNhanhService
      .getAllWardByDistrictID(this.districtId)
      .subscribe({
        next: (resp: any) => {
          this.wards = resp.data;
          this.addressForm.get("huyen").setValue(this.getDistrictName());
        },
      });
  }

  // 9.1
  private getDistrictId(): void {
    for (let i = 0; i < this.districts.length; i++) {
      const element = this.districts[i];
      if (element.NameExtension.includes(this.addressForm.get("huyen").value)) {
        this.districtId = element.DistrictID;
        break;
      }
    }
  }

  // 9.2
  private getDistrictName(): string {
    let districtName = this.addressForm.get("huyen").value;
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

  // private functions
  // calculate prices
  // 1
  private getRealPrice(): number {
    let result: number = 0;
    for (const item of this.cartItems) {
      result += item.spct.giaBan * item.soLuong;
    }
    return result;
  }

  // 2
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

  // 3
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

  // 4
  private getShipPrice(): number {
    return 0;
  }

  // 5
  private getFinalPrice(): number {
    return (
      this.realPrice - this.salePrice - this.discountPrice + this.shipPrice
    );
  }
  // end: calculate prices

  //
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

  private getDiscountsForNoneLoggedCheckOut(): void {
    this.discountService
      .getDiscountsForNoneLoggedCheckOut(this.realPrice - this.salePrice)
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

  private initAddAddressForm(): void {
    this.addressForm = new FormGroup({
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
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
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
    });
  }

  private customNotBlankValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }
}
