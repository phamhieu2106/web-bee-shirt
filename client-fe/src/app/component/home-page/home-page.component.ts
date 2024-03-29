import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { MauSac } from "src/app/model/class/mau-sac.class";

import { SanPham } from "src/app/model/class/san-pham.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { SanPhamService } from "src/app/service/san-pham.service";

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent {
  public pagedResponse: PagedResponse<SanPham>;


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-caret-left"></i>', '<i class="bi bi-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  // constructor, ngOn
  constructor(
    private currencyPipe: CurrencyPipe,
    private sanPhamService: SanPhamService
  ) {}

  ngOnInit(): void {
    this.getSanPhamList();

   
  }

  // I. public functions
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

  // II. private functions
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
  private getSanPhamList(): void {
    this.sanPhamService.getByPageClient().subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
