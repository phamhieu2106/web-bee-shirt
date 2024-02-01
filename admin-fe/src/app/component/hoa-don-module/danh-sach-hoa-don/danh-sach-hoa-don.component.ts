import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";

import { HoaDonService } from "src/app/service/hoa-don.service";

@Component({
  selector: "app-danh-sach-hoa-don",
  templateUrl: "./danh-sach-hoa-don.component.html",
  styleUrls: ["./danh-sach-hoa-don.component.css"],
})
export class DanhSachHoaDonComponent {
  public hoaDons: PagedResponse<HoaDon>;
  public search = "";
  public loaiHoaDon = "";
  public trangThai = "";
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
        this.ngayTao,
        this.trangThai
      )
      .subscribe({
        next: (response: any) => {
          this.hoaDons = response;
          // console.log(response);
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
    this.trangThai = "";
  }

  changePage(page: number = 0) {
    this.hoaDonService
      .getAll(page, this.pageSize, this.search, this.loaiHoaDon, this.ngayTao)
      .subscribe({
        next: (response: any) => {
          this.hoaDons = response;
          // console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  changeStatus(status = "") {
    this.trangThai = status;
    this.hoaDons.data = [];
    this.getHoaDons();
  }
}
