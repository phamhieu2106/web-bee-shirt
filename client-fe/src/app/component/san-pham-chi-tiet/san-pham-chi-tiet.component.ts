import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SanPham } from "src/app/model/class/san-pham.class";
import { NotificationService } from "src/app/service/notification.service";
import { SanPhamService } from "src/app/service/san-pham.service";

@Component({
  selector: "app-san-pham-chi-tiet",
  templateUrl: "./san-pham-chi-tiet.component.html",
  styleUrls: ["./san-pham-chi-tiet.component.css"],
})
export class SanPhamChiTietComponent {
  public sanPham: SanPham;

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private sanPhamService: SanPhamService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getSanPham();
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
