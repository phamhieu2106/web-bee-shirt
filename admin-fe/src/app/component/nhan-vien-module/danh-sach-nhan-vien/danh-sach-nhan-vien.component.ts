import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NhanVien } from "src/app/model/class/nhan-vien.class";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { NhanVienService } from "src/app/service/nhan-vien.service";

@Component({
  selector: "app-danh-sach-nhan-vien",
  templateUrl: "./danh-sach-nhan-vien.component.html",
  styleUrls: ["./danh-sach-nhan-vien.component.css"],
})
export class DanhSachNhanVienComponent {
  icon: string = "fa-solid fa-users";
  title: string = "Nhân Viên";
  mainHeading: string = "Nhân Viên";

  public pagedResponse: PagedResponse<NhanVienResponse>;
  public search = "";
  public nhanVienDetails: NhanVienResponse;

  constructor(private nhanVienService: NhanVienService) {}

  ngOnInit() {
    this.getAllNhanVien();
  }

  // private function
  private getAllNhanVien(): void {
    this.nhanVienService.getAll().subscribe({
      next: (response: PagedResponse<NhanVienResponse>) => {
        this.pagedResponse = response;
        console.log(this.pagedResponse);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.nhanVienService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<NhanVienResponse>) => {
        this.pagedResponse = response;
        console.log("pageNumber " + page);
        console.log("pageSize " + pageSize);
        console.log("search " + keyword);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  public openDetailsForm(id: number): void {
    this.nhanVienService.getOneById(id).subscribe({
      next: (response) => {
        this.nhanVienDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public timKiem(e: any): void {
    console.log(e.target.value);
    this.goToPage(1, this.pagedResponse.pageSize, e.target.value);
  }
}
