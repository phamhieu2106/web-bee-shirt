import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef } from "@angular/core";
import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { CoAo } from "src/app/model/class/co-ao.class";
import { KichCo } from "src/app/model/class/kich-co.class";
import { KieuDang } from "src/app/model/class/kieu-dang.class";
import { KieuThietKe } from "src/app/model/class/kieu-thiet-ke.class";

import { MauSac } from "src/app/model/class/mau-sac.class";
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

  public selectedColorIds: number[] = [];
  public selectedSizeIds: number[] = [];
  public selectedFormIds: number[] = [];
  public selectedDesignIds: number[] = [];
  public selectedCollarIds: number[] = [];
  public selectedSleeveIds: number[] = [];
  public selectedMaterialIds: number[] = [];

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
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getInitProductList();
    this.getPropertiesForFilter();
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
      if (!this.checkColorExist(mauSacs, spct.mauSac.id)) {
        mauSacs.push(spct.mauSac);
      }
    }
    return mauSacs;
  }

  // 3
  public toggleProperty(event: any, type: string, propertyId: number): void {
    const isChecked = event.target.checked;

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
      }
    }

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
      }
    }

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
      }
    }

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
      }
    }

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
      }
    }

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
      }
    }

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
      }
    }

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
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
  }

  public goToPage(pageNumber: number, pageSize: number): void {
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
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
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
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
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
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 5
  private getAllDesigns(): void {
    this.designService.getAllActive().subscribe({
      next: (response: KieuThietKe[]) => {
        this.activeDesigns = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 6
  private getAllSleeves(): void {
    this.sleeveService.getAllActive().subscribe({
      next: (response: TayAo[]) => {
        this.activeSleeves = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 7
  private getAllActiveCollars(): void {
    this.collarService.getAllActive().subscribe({
      next: (response: CoAo[]) => {
        this.activeCollars = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 8
  private getAllActiveMaterials(): void {
    this.materialService.getAllActive().subscribe({
      next: (response: ChatLieu[]) => {
        this.activeMaterials = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 9
  private getAllActiveColors(): void {
    this.colorService.getAllActiveColors().subscribe({
      next: (response: MauSac[]) => {
        this.activeColors = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 10
  private getAllActiveSizes(): void {
    this.sizeService.getAllActiveSizes().subscribe({
      next: (response: KichCo[]) => {
        this.activeSizes = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }


  // filter

  onClick(event: MouseEvent) {
    // Lấy phần tử được nhấp
    const target = event.currentTarget as HTMLElement;
    
   
  
    // Kiểm tra xem phần tử này đã có class "inactive" và "active" hay không
    if (target.classList.contains('inactive') && target.classList.contains('active')) {
      // Loại bỏ class "inactive" và "active" khỏi phần tử
      target.classList.remove('inactive');
      target.classList.remove('active');

     
  
      // Tìm phần tử <dd> tương ứng và loại bỏ style "display: none;"
      const ddElement = target.nextElementSibling as HTMLElement;
      
      if (ddElement && ddElement.classList.contains('filter-options-content')) {
        ddElement.style.display = 'block';
      }
    }else{
      target.classList.add('inactive');
      target.classList.add('active');

      const ddElement = target.nextElementSibling as HTMLElement;
      
      if (ddElement && ddElement.classList.contains('filter-options-content')) {
        ddElement.style.display = 'none';
      }
    }
  }
}
