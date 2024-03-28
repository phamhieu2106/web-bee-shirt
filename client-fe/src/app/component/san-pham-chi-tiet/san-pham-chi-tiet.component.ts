import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SanPham } from "src/app/model/class/san-pham.class";
import { NotificationService } from "src/app/service/notification.service";
import { SanPhamService } from "src/app/service/san-pham.service";
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: "app-san-pham-chi-tiet",
  templateUrl: "./san-pham-chi-tiet.component.html",
  styleUrls: ["./san-pham-chi-tiet.component.css"],
})
export class SanPhamChiTietComponent {
  public sanPham: SanPham;
  sanPhamCT: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
    
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private sanPhamService: SanPhamService,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSanPham();
    const productImg = document.getElementById('product-img') as HTMLImageElement;
    const smallImg = document.getElementsByClassName('small-img');
    
    for (let i = 0; i < smallImg.length; i++) {
      const imgElement = smallImg[i] as HTMLImageElement;
      imgElement.onclick = function() {
        productImg.src = imgElement.src;
      }
    }
  }

  // II. private functions
  // 1
  private getSanPham(): void {
    this.activatedRoute.params.subscribe((params) => {
      let productId = params["id"];
      console.log(productId);

      // get sp by ID
      this.sanPhamService.getById(productId).subscribe({
        next: (response: SanPham) => {
          this.sanPham = response;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
    });
  }


}
