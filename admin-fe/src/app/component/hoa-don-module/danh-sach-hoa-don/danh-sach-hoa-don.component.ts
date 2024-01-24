import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { HoaDonService } from "src/app/service/hoa-don.service";

@Component({
  selector: "app-danh-sach-hoa-don",
  templateUrl: "./danh-sach-hoa-don.component.html",
  styleUrls: ["./danh-sach-hoa-don.component.css"],
})
export class DanhSachHoaDonComponent {
  public hoaDons: any;
  public search = "";
  public loaiHoaDon = "";
  public ngayTao = "";
  public pageSize = 25;
  public pageNumber = 0;
  constructor(private hoaDonService: HoaDonService) {}

  ngOnInit() {
    this.getHoaDons();
  }

  getHoaDons() {
    this.hoaDonService
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.search,
        this.loaiHoaDon,
        this.ngayTao
      )
      .subscribe({
        next: (response: any) => {
          this.hoaDons = response;
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  timKiem() {
    this.getHoaDons();
  }

  clearFilter() {
    this.search = "";
    this.loaiHoaDon = "";
    this.ngayTao = "";
  }

  changePage(page: number = 0) {
    this.hoaDonService
      .getAll(page, this.pageSize, this.search, this.loaiHoaDon, this.ngayTao)
      .subscribe({
        next: (response: any) => {
          this.hoaDons = response;
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
