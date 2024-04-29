import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SanPham } from "src/app/model/class/san-pham.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: "app-search-product",
  templateUrl: "./search-product.component.html",
  styleUrls: ["./search-product.component.css"],
})
export class SearchProductComponent {
  isShowSuggest = false;
  search = "";
  public pagedResponse: PagedResponse<SanPham>;

  // constructor, ngOn
  constructor(
    private currencyPipe: CurrencyPipe,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  showSuggest(isShow: boolean) {
    setTimeout(() => {
      this.isShowSuggest = isShow;
    }, 150);
  }

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

  getSanPhamList(): void {
    this.productService.getByPageClient(1, 10, this.search).subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  getDiscountMax(index: number): any {
    return this.pagedResponse?.data[index]?.saleEvent?.giaTriPhanTram;
  }

  chooseProduct(id: number) {
    this.router.navigate(["/san-pham/" + id]);
  }
}
