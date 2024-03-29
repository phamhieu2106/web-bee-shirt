import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { OwlOptions } from "ngx-owl-carousel-o";

import { SanPham } from "src/app/model/class/san-pham.class";
import { NotificationService } from "src/app/service/notification.service";
import { SanPhamService } from "src/app/service/san-pham.service";
import { MauSac } from "src/app/model/class/mau-sac.class";
import { MauSacService } from "src/app/service/mau-sac.service";
import { HinhAnh } from "src/app/model/class/hinh-anh.class";
import { SizeService } from "src/app/service/size.service";
import { KichCo } from "src/app/model/class/kich-co.class";
import { ProductImageService } from "src/app/service/product-img.service";

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

  sanPhamCT: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
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
    private sanPhamService: SanPhamService,
    private mauSacService: MauSacService,
    private sizeService: SizeService,
    private productImgService: ProductImageService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProductById();

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

  // public functions
  // 1
  public changeColorIndex(newIndex: number, colorId: number): void {
    this.curColorIndex = newIndex;

    this.sizeService
      .getAllByProductAndColor(this.sanPham.id, colorId)
      .subscribe({
        next: (sizeResponse: KichCo[]) => {
          this.curSizeIndex = 0;
          this.curSizesOfProduct = sizeResponse;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

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
  }

  public changeSizeIndex(newIndex: number): void {
    this.curSizeIndex = newIndex;
  }

  // private functions
  // 1
  private getProductById(): void {
    this.activatedRoute.params.subscribe((params) => {
      let productId = params["id"];

      // get product
      this.sanPhamService.getOneById(productId).subscribe({
        next: (response: SanPham) => {
          this.sanPham = response;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

      // get colors of this product
      this.mauSacService.getAllColorOfProduct(productId).subscribe({
        next: (colorResponse: MauSac[]) => {
          this.colorsOfProduct = colorResponse;

          // lấy danh sách kích thước của màu thứ 1 và sản phẩm
          this.sizeService
            .getAllByProductAndColor(productId, colorResponse[0].id)
            .subscribe({
              next: (sizeResponse: KichCo[]) => {
                this.curSizesOfProduct = sizeResponse;
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
}
