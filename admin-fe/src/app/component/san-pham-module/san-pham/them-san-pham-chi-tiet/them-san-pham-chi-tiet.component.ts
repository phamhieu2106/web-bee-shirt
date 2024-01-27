import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SanPham } from "src/app/model/class/san-pham.class";
import { SanPhamService } from "src/app/service/san-pham.service";

@Component({
  selector: "app-them-san-pham-chi-tiet",
  templateUrl: "./them-san-pham-chi-tiet.component.html",
  styleUrls: ["./them-san-pham-chi-tiet.component.css"],
})
export class ThemSanPhamChiTietComponent {
  public sanPham: SanPham;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanPhamService: SanPhamService
  ) {}

  ngOnInit(): void {
    this.getSanPhamById();
  }

  // private functions
  private getSanPhamById(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.sanPhamService.getById(params["sanPhamId"]).subscribe({
        next: (response: SanPham) => {
          console.log(response);

          this.sanPham = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }
}
