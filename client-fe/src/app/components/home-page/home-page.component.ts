import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { forkJoin } from "rxjs";

import { OwlOptions } from "ngx-owl-carousel-o";

import { NotificationService } from "src/app/service/notification.service";
import { MauSac } from "src/app/model/class/mau-sac.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { ProductService } from "src/app/service/product.service";
import { AuthenticationService } from "src/app/service/authentication.service";
import { DiscountService } from "src/app/service/discount.service";
import { Discount } from "src/app/model/class/discount.class";
import { SaleEventService } from "src/app/service/sale-event.service";
import { SaleEvent } from "src/app/model/class/sale-event.class";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent {
  public pagedResponse: PagedResponse<SanPham>;
  public isLoggedIn: boolean;
  public discounts: Discount[] = [];
  @Input() saleProducts: SanPham[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 800,
    navText: [
      '<i class="bi bi-caret-left"></i>',
      '<i class="bi bi-caret-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  // constructor, ngOn
  constructor(
    private currencyPipe: CurrencyPipe,
    private productService: ProductService,
    private notifService: NotificationService,
    private authService: AuthenticationService,
    private discountService: DiscountService,
    private saleEventService: SaleEventService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedInSubj.subscribe((value: boolean) => {
      this.isLoggedIn = value;
    });

    this.getIsLoggedInValue();
    this.getProductList();
  }

  // public functions
  // 1
  public displayPrice(sanPham: SanPham): any {
    const priceArr = [];
    for (let spct of sanPham.sanPhamChiTiets) {
      priceArr.push(spct.giaBan);
    }
    const minPrice = Math.min(...priceArr);
    const maxPrice = Math.max(...priceArr);
    if (minPrice === maxPrice) {
      return this.currencyPipe.transform(minPrice, "VND", "symbol", "1.0-0");
    }
    return (
      this.currencyPipe.transform(minPrice, "VND", "symbol", "1.0-0") +
      " - " +
      this.currencyPipe.transform(maxPrice, "VND", "symbol", "1.0-0")
    );
  }

  // 2
  public getMauSacList(sanPham: SanPham): MauSac[] {
    const mauSacs: MauSac[] = [];
    for (let spct of sanPham.sanPhamChiTiets) {
      if (!this.checkExist(mauSacs, spct.mauSac.id)) {
        mauSacs.push(spct.mauSac);
      }
    }
    return mauSacs;
  }

  // private functions
  // 1
  private checkExist(mauSacs: MauSac[], mauSacId: number): boolean {
    for (let m of mauSacs) {
      if (m.id === mauSacId) {
        return true;
      }
    }
    return false;
  }

  // 2
  private getProductList(): void {
    this.productService.getByPageClient().subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;

        // check product in sale or not
        let observables = [];
        for (let prod of response.data) {
          observables.push(this.saleEventService.getSaleEventOfProd(prod.id));
        }
        forkJoin(observables).subscribe({
          next: (values: SaleEvent[]) => {
            values.forEach((v, index) => {
              response.data[index].saleEvent = v;
            });
            this.saleProducts = response.data.filter(
              (p: SanPham) => p.saleEvent !== null
            );
          },
        });
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 3
  private getDiscountOfNoneLog(): void {
    this.discountService.getAllDiscountsForNoneLog().subscribe({
      next: (discounts: Discount[]) => {
        this.discounts = discounts;
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 4
  private getDiscountOfLog(): void {
    const custId = this.authService.getCustomerFromStorage()?.id;
    if (custId) {
      this.discountService.getAllDiscountsOf1Cust(custId).subscribe({
        next: (discounts: Discount[]) => {
          this.discounts = discounts;
        },
        error: (errResp: HttpErrorResponse) => {
          this.notifService.error(errResp.error.message);
        },
      });
    }
  }

  // 5
  private getIsLoggedInValue(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.getDiscountOfLog();
    } else {
      this.getDiscountOfNoneLog();
    }
  }
}
