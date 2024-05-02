import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { forkJoin } from "rxjs";

import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { CoAo } from "src/app/model/class/co-ao.class";
import { KichCo } from "src/app/model/class/kich-co.class";
import { KieuDang } from "src/app/model/class/kieu-dang.class";
import { KieuThietKe } from "src/app/model/class/kieu-thiet-ke.class";
import { MauSac } from "src/app/model/class/mau-sac.class";
import { SaleEvent } from "src/app/model/class/sale-event.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { TayAo } from "src/app/model/class/tay-ao.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { CollarService } from "src/app/service/collar.service";
import { ColorService } from "src/app/service/color.service";
import { DesignService } from "src/app/service/design.service";
import { FormService } from "src/app/service/form.service";
import { MaterialService } from "src/app/service/material.service";
import { NotificationService } from "src/app/service/notification.service";
import { ProductService } from "src/app/service/product.service";
import { SaleEventService } from "src/app/service/sale-event.service";
import { SizeService } from "src/app/service/size.service";
import { SleeveService } from "src/app/service/sleeve.service";

@Component({
  selector: "app-san-pham",
  templateUrl: "./san-pham.component.html",
  styleUrls: ["./san-pham.component.css"],
})
export class SanPhamComponent {
  public pagedResponse: PagedResponse<SanPham>;

  public activeColors: MauSac[] = [];
  public activeSizes: KichCo[] = [];
  public activeForms: KieuDang[] = [];
  public activeDesigns: KieuThietKe[] = [];
  public activeSleeves: TayAo[] = [];
  public activeCollars: CoAo[] = [];
  public activeMaterials: ChatLieu[] = [];

  public initColorIds: number[] = [];
  public initSizeIds: number[] = [];
  public initFormIds: number[] = [];
  public initDesignIds: number[] = [];
  public initCollarIds: number[] = [];
  public initSleeveIds: number[] = [];
  public initMaterialIds: number[] = [];

  public minPrice: number = 0;
  public maxPrice: number = 999_999_999;
  public selectedColorIds: number[] = [];
  public selectedSizeIds: number[] = [];
  public selectedFormIds: number[] = [];
  public selectedDesignIds: number[] = [];
  public selectedCollarIds: number[] = [];
  public selectedSleeveIds: number[] = [];
  public selectedMaterialIds: number[] = [];

  public isLoadding = false;
  public overlayText: string = "";

  // constructor, ngOn
  constructor(
    private currencyPipe: CurrencyPipe,
    private productService: ProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private formService: FormService,
    private designService: DesignService,
    private sleeveService: SleeveService,
    private collarService: CollarService,
    private materialService: MaterialService,
    private notifService: NotificationService,
    private saleEventService: SaleEventService
  ) {}

  ngOnInit(): void {
    this.turnOnOverlay("Vui lòng chờ");
    this.getPropertiesForFilter();
    setTimeout(() => {
      this.getInitProductList();
      this.turnOffOverlay("");
    }, 1000);
  }

  // public functions
  //
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 1
  public displayPrice(prod: SanPham): any {
    const priceArr = [];
    for (let spct of prod.sanPhamChiTiets) {
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

  public displayDiscountPrice(prod: SanPham): any {
    const priceArr = [];
    for (let spct of prod.sanPhamChiTiets) {
      let saleEvent = prod.saleEvent;
      priceArr.push(
        Math.round((spct.giaBan * (100 - saleEvent.giaTriPhanTram)) / 100)
      );
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
      if (!this.checkColorExist(mauSacs, spct.mauSac.id)) {
        mauSacs.push(spct.mauSac);
      }
    }
    return mauSacs;
  }

  // 3
  public toggleProperty(event: any, type: string, propertyId: number): void {
    let isAllEmpty: boolean;
    const isChecked = event.target.checked;

    // color
    if (type === "color") {
      if (
        !this.selectedColorIds.some((id: number) => id === propertyId) &&
        isChecked
      ) {
        this.selectedColorIds.push(propertyId);
      } else if (!isChecked) {
        this.selectedColorIds = this.selectedColorIds.filter(
          (id: number) => id !== propertyId
        );
        isAllEmpty = this.checkAllSelectedIdList();
      }
    }

    // size
    if (type === "size") {
      if (
        !this.selectedSizeIds.some((id: number) => id === propertyId) &&
        isChecked
      ) {
        this.selectedSizeIds.push(propertyId);
      } else if (!isChecked) {
        this.selectedSizeIds = this.selectedSizeIds.filter(
          (id: number) => id !== propertyId
        );
        isAllEmpty = this.checkAllSelectedIdList();
      }
    }

    // form
    if (type === "form") {
      if (
        !this.selectedFormIds.some((id: number) => id === propertyId) &&
        isChecked
      ) {
        this.selectedFormIds.push(propertyId);
      } else if (!isChecked) {
        this.selectedFormIds = this.selectedFormIds.filter(
          (id: number) => id !== propertyId
        );
        isAllEmpty = this.checkAllSelectedIdList();
      }
    }

    // design
    if (type === "design") {
      if (
        !this.selectedDesignIds.some((id: number) => id === propertyId) &&
        isChecked
      ) {
        this.selectedDesignIds.push(propertyId);
      } else if (!isChecked) {
        this.selectedDesignIds = this.selectedDesignIds.filter(
          (id: number) => id !== propertyId
        );
        isAllEmpty = this.checkAllSelectedIdList();
      }
    }

    // collar
    if (type === "collar") {
      if (
        !this.selectedCollarIds.some((id: number) => id === propertyId) &&
        isChecked
      ) {
        this.selectedCollarIds.push(propertyId);
      } else if (!isChecked) {
        this.selectedCollarIds = this.selectedCollarIds.filter(
          (id: number) => id !== propertyId
        );
        isAllEmpty = this.checkAllSelectedIdList();
      }
    }

    // sleeve
    if (type === "sleeve") {
      if (
        !this.selectedSleeveIds.some((id: number) => id === propertyId) &&
        isChecked
      ) {
        this.selectedSleeveIds.push(propertyId);
      } else if (!isChecked) {
        this.selectedSleeveIds = this.selectedSleeveIds.filter(
          (id: number) => id !== propertyId
        );
        isAllEmpty = this.checkAllSelectedIdList();
      }
    }

    // material
    if (type === "material") {
      if (
        !this.selectedMaterialIds.some((id: number) => id === propertyId) &&
        isChecked
      ) {
        this.selectedMaterialIds.push(propertyId);
      } else if (!isChecked) {
        this.selectedMaterialIds = this.selectedMaterialIds.filter(
          (id: number) => id !== propertyId
        );
        isAllEmpty = this.checkAllSelectedIdList();
      }
    }

    if (isAllEmpty) {
      this.getInitProductList();
    } else {
      this.productService
        .getByFilterForClient(
          1,
          8,
          this.selectedColorIds,
          this.selectedSizeIds,
          this.selectedFormIds,
          this.selectedDesignIds,
          this.selectedCollarIds,
          this.selectedSleeveIds,
          this.selectedMaterialIds,
          0,
          0
        )
        .subscribe({
          next: (response: PagedResponse<SanPham>) => {
            this.pagedResponse = response;
            this.getSaleEventForProduct(this.pagedResponse);
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
          },
        });
    }
  }

  private checkAllSelectedIdList(): boolean {
    if (
      this.selectedColorIds.length === 0 &&
      this.selectedSizeIds.length === 0 &&
      this.selectedFormIds.length === 0 &&
      this.selectedDesignIds.length === 0 &&
      this.selectedCollarIds.length === 0 &&
      this.selectedSleeveIds.length === 0 &&
      this.selectedMaterialIds.length === 0
    ) {
      return true;
    }
    return false;
  }

  public goToPage(pageNumber: number, pageSize: number): void {
    const isAllEmpty = this.checkAllSelectedIdList();
    if (isAllEmpty) {
      this.productService
        .getByFilterForClient(
          pageNumber,
          pageSize,
          this.initColorIds,
          this.initSizeIds,
          this.initFormIds,
          this.initDesignIds,
          this.initCollarIds,
          this.initSleeveIds,
          this.initMaterialIds,
          this.minPrice,
          this.maxPrice
        )
        .subscribe({
          next: (response: PagedResponse<SanPham>) => {
            this.pagedResponse = response;
            this.getSaleEventForProduct(this.pagedResponse);
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
          },
        });
    } else {
      this.productService
        .getByFilterForClient(
          pageNumber,
          pageSize,
          this.selectedColorIds,
          this.selectedSizeIds,
          this.selectedFormIds,
          this.selectedDesignIds,
          this.selectedCollarIds,
          this.selectedSleeveIds,
          this.selectedMaterialIds,
          0,
          0
        )
        .subscribe({
          next: (response: PagedResponse<SanPham>) => {
            this.pagedResponse = response;
            this.getSaleEventForProduct(this.pagedResponse);
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
          },
        });
    }
  }

  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value);
  }

  public filterByPrice(minPrice: number, maxPrice: number): void {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    if (this.checkAllSelectedIdList()) {
      this.productService
        .getByFilterForClient(
          1,
          8,
          this.initColorIds,
          this.initSizeIds,
          this.initFormIds,
          this.initDesignIds,
          this.initCollarIds,
          this.initSleeveIds,
          this.initMaterialIds,
          minPrice,
          maxPrice
        )
        .subscribe({
          next: (response: PagedResponse<SanPham>) => {
            this.pagedResponse = response;
            this.getSaleEventForProduct(this.pagedResponse);
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
          },
        });
    } else {
      this.productService
        .getByFilterForClient(
          1,
          8,
          this.selectedColorIds,
          this.selectedSizeIds,
          this.selectedFormIds,
          this.selectedDesignIds,
          this.selectedCollarIds,
          this.selectedSleeveIds,
          this.selectedMaterialIds,
          minPrice,
          maxPrice
        )
        .subscribe({
          next: (response: PagedResponse<SanPham>) => {
            this.pagedResponse = response;
            this.getSaleEventForProduct(this.pagedResponse);
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
          },
        });
    }
  }

  // private functions
  // 1
  private checkColorExist(mauSacs: MauSac[], mauSacId: number): boolean {
    for (let m of mauSacs) {
      if (m.id === mauSacId) {
        return true;
      }
    }
    return false;
  }

  // 2
  private getInitProductList(): void {
    this.productService
      .getByFilterForClient(
        1,
        8,
        this.initColorIds,
        this.initSizeIds,
        this.initFormIds,
        this.initDesignIds,
        this.initCollarIds,
        this.initSleeveIds,
        this.initMaterialIds,
        this.minPrice,
        this.maxPrice
      )
      .subscribe({
        next: (response: PagedResponse<SanPham>) => {
          this.pagedResponse = response;
          this.getSaleEventForProduct(this.pagedResponse);
        },
        error: (errResp: HttpErrorResponse) => {
          this.notifService.error(errResp.error.message);
        },
      });
  }

  private getSaleEventForProduct(pagedProducts: PagedResponse<SanPham>): void {
    // check product in sale or not
    let observables = [];
    for (let prod of pagedProducts.data) {
      observables.push(this.saleEventService.getSaleEventOfProd(prod.id));
    }
    forkJoin(observables).subscribe({
      next: (values: SaleEvent[]) => {
        values.forEach((v, index) => {
          pagedProducts.data[index].saleEvent = v;
        });
      },
    });
  }

  // 3
  private getPropertiesForFilter(): void {
    // lấy 7 các thuộc tính của SP: kiểu dáng, thiết kế, tay áo, cổ áo, chất liệu, màu sắc, kích cỡ
    this.getAllForms();
    this.getAllDesigns();
    this.getAllSleeves();
    this.getAllActiveCollars();
    this.getAllActiveMaterials();
    this.getAllActiveColors();
    this.getAllActiveSizes();
  }

  // 4
  private getAllForms(): void {
    this.formService.getAllActive().subscribe({
      next: (response: KieuDang[]) => {
        this.activeForms = response;
        this.initColorIds = response.map((kd: KieuDang) => kd.id);
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 5
  private getAllDesigns(): void {
    this.designService.getAllActive().subscribe({
      next: (response: KieuThietKe[]) => {
        this.activeDesigns = response;
        this.initDesignIds = response.map((tk: KieuThietKe) => tk.id);
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 6
  private getAllSleeves(): void {
    this.sleeveService.getAllActive().subscribe({
      next: (response: TayAo[]) => {
        this.activeSleeves = response;
        this.initSleeveIds = response.map((ta: TayAo) => ta.id);
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 7
  private getAllActiveCollars(): void {
    this.collarService.getAllActive().subscribe({
      next: (response: CoAo[]) => {
        this.activeCollars = response;
        this.initCollarIds = response.map((ca: CoAo) => ca.id);
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 8
  private getAllActiveMaterials(): void {
    this.materialService.getAllActive().subscribe({
      next: (response: ChatLieu[]) => {
        this.activeMaterials = response;
        this.initMaterialIds = response.map((cl: ChatLieu) => cl.id);
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 9
  private getAllActiveColors(): void {
    this.colorService.getAllActiveColors().subscribe({
      next: (response: MauSac[]) => {
        this.activeColors = response;
        this.initColorIds = response.map((ms: MauSac) => ms.id);
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 10
  private getAllActiveSizes(): void {
    this.sizeService.getAllActiveSizes().subscribe({
      next: (response: KichCo[]) => {
        this.activeSizes = response;
        this.initSizeIds = response.map((kc: KichCo) => kc.id);
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // filter
  public onClick(event: MouseEvent): void {
    // Lấy phần tử được nhấp
    const target = event.currentTarget as HTMLElement;

    // Kiểm tra xem phần tử này đã có class "inactive" và "active" hay không
    if (
      target.classList.contains("inactive") &&
      target.classList.contains("active")
    ) {
      // Loại bỏ class "inactive" và "active" khỏi phần tử
      target.classList.remove("inactive");
      target.classList.remove("active");

      // Tìm phần tử <dd> tương ứng và loại bỏ style "display: none;"
      const ddElement = target.nextElementSibling as HTMLElement;

      if (ddElement && ddElement.classList.contains("filter-options-content")) {
        ddElement.style.display = "block";
      }
    } else {
      target.classList.add("inactive");
      target.classList.add("active");

      const ddElement = target.nextElementSibling as HTMLElement;

      if (ddElement && ddElement.classList.contains("filter-options-content")) {
        ddElement.style.display = "none";
      }
    }
  }

  //
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  //
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
