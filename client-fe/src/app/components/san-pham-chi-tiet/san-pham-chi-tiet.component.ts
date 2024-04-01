import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { OwlOptions } from "ngx-owl-carousel-o";

import { SanPham } from "src/app/model/class/san-pham.class";
import { NotificationService } from "src/app/service/notification.service";
import { ProductService } from "src/app/service/product.service";
import { MauSac } from "src/app/model/class/mau-sac.class";
import { ColorService } from "src/app/service/color.service";
import { SizeService } from "src/app/service/size.service";
import { KichCo } from "src/app/model/class/kich-co.class";
import { ProductImageService } from "src/app/service/product-img.service";
import { ProductDetailsService } from "src/app/service/product-details.service";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-san-pham-chi-tiet",
  templateUrl: "./san-pham-chi-tiet.component.html",
  styleUrls: ["./san-pham-chi-tiet.component.css"],
})
export class SanPhamChiTietComponent {
  public sanPham: SanPham;
  public colorsOfProduct: MauSac[] = [];
  public curSizesOfProduct: KichCo[] = [];
  public curImgUrls: String[] = [];

  public curColorIndex: number = 0;
  public curSizeIndex: number = 0;
  public curQuantity: number = 0;
  public curPrice: number = 0;

  public form: string;
  public design: string;
  public collar: string;
  public sleeve: string;
  public material: string;

  sanPhamCT: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private productService: ProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private productImgService: ProductImageService,
    private productDetailsService: ProductDetailsService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.giDoCuaBinh();
    this.getProductById();
  }

  // public functions
  // 1
  public changeColorIndex(newIndex: number, colorId: number): void {
    this.curColorIndex = newIndex;
    this.curSizeIndex = 0;

    // lấy lại danh sách size
    this.sizeService
      .getAllByProductAndColor(this.sanPham.id, colorId)
      .subscribe({
        next: (sizeResponse: KichCo[]) => {
          this.curSizesOfProduct = sizeResponse;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

    // lấy lại danh sách hình ảnh
    this.productImgService
      .getAllUrlBySanPhamAndMauSac(this.sanPham.id, colorId)
      .subscribe({
        next: (urlResponse: String[]) => {
          this.curImgUrls = urlResponse;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

    // lấy lại số lượng
    this.productDetailsService
      .getQuantityOfOne(
        this.sanPham.id,
        colorId,
        this.curSizesOfProduct[this.curSizeIndex].id
      )
      .subscribe({
        next: (quantity: number) => {
          this.curQuantity = quantity;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

    // lấy lại giá
    this.productDetailsService
      .getPriceOfOne(
        this.sanPham.id,
        colorId,
        this.curSizesOfProduct[this.curSizeIndex].id
      )
      .subscribe({
        next: (price: number) => {
          this.curPrice = price;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
  }

  // 2
  public changeSizeIndex(newIndex: number, sizeId: number): void {
    this.curSizeIndex = newIndex;

    // lấy lại số lượng
    this.productDetailsService
      .getQuantityOfOne(
        this.sanPham.id,
        this.colorsOfProduct[this.curColorIndex].id,
        sizeId
      )
      .subscribe({
        next: (quantity: number) => {
          this.curQuantity = quantity;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

    // lấy lại giá
    this.productDetailsService
      .getPriceOfOne(
        this.sanPham.id,
        this.colorsOfProduct[this.curColorIndex].id,
        sizeId
      )
      .subscribe({
        next: (price: number) => {
          this.curPrice = price;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
  }

  // 3
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }
  // private functions
  // 1
  private getProductById(): void {
    this.activatedRoute.params.subscribe((params) => {
      let productId = params["id"];

      // get product
      this.productService.getOneById(productId).subscribe({
        next: (response: SanPham) => {
          this.sanPham = response;

          // lấy chất liệu
          this.assignProperties();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

      // get colors of this product
      this.colorService.getAllColorOf1Product(productId).subscribe({
        next: (colorResponse: MauSac[]) => {
          this.colorsOfProduct = colorResponse;

          // lấy danh sách kích thước của màu thứ 1 và sản phẩm
          this.sizeService
            .getAllByProductAndColor(productId, colorResponse[0].id)
            .subscribe({
              next: (sizeResponse: KichCo[]) => {
                this.curSizesOfProduct = sizeResponse;

                // lấy số lượng
                this.productDetailsService
                  .getQuantityOfOne(
                    productId,
                    colorResponse[0].id,
                    sizeResponse[0].id
                  )
                  .subscribe({
                    next: (quantity: number) => {
                      this.curQuantity = quantity;
                    },
                    error: (errorResponse: HttpErrorResponse) => {
                      this.notifService.error(errorResponse.error.message);
                    },
                  });

                // lấy giá
                this.productDetailsService
                  .getPriceOfOne(
                    productId,
                    colorResponse[0].id,
                    sizeResponse[0].id
                  )
                  .subscribe({
                    next: (price: number) => {
                      this.curPrice = price;
                    },
                    error: (errorResponse: HttpErrorResponse) => {
                      this.notifService.error(errorResponse.error.message);
                    },
                  });
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.notifService.error(errorResponse.error.message);
              },
            });

          // lấy danh sách các ảnh của màu thứ nhất và sản phẩm
          this.productImgService
            .getAllUrlBySanPhamAndMauSac(productId, colorResponse[0].id)
            .subscribe({
              next: (urlResponse: String[]) => {
                this.curImgUrls = urlResponse;
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.notifService.error(errorResponse.error.message);
              },
            });
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
    });
  }

  //
  private assignProperties(): void {
    let anyProductDetails = this.sanPham.sanPhamChiTiets[0];
    this.form = anyProductDetails.kieuDang.ten;
    this.design = anyProductDetails.thietKe.ten;
    this.collar = anyProductDetails.coAo.ten;
    this.sleeve = anyProductDetails.tayAo.ten;
    this.material = anyProductDetails.chatLieu.ten;
  }

  private giDoCuaBinh(): void {
    const productImg = document.getElementById(
      "product-img"
    ) as HTMLImageElement;
    const smallImg = document.getElementsByClassName("small-img");

    for (let i = 0; i < smallImg.length; i++) {
      const imgElement = smallImg[i] as HTMLImageElement;
      imgElement.onclick = function () {
        productImg.src = imgElement.src;
      };
    }
  }
}
