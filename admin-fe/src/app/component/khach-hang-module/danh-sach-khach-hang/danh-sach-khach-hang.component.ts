import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KhachHangService } from "src/app/service/khach-hang.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-danh-sach-khach-hang",
  templateUrl: "./danh-sach-khach-hang.component.html",
  styleUrls: ["./danh-sach-khach-hang.component.css"],
})
export class DanhSachKhachHangComponent {
  icon: string = "fa-solid fa-users";
  title: string = "khách hàng";
  mainHeading: string = "khách hàng";

  public pagedResponse: PagedResponse<KhachHangResponse>;
  public search = "";
  public khachHangDetail: KhachHangResponse;
  public khDetail: KhachHangResponse;
  public formUpdateKH: FormGroup;
 private timeout: any;
 public trangThaiFilter: number[] = [0, 1];
  public gioiTinhFilter: number[] = [0, 1];
  constructor(
    private khachHangService: KhachHangService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getKhachHangList();
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.khachHangService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KhachHangResponse>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
  onChangeFilter() {
    this.khachHangService
      .filter(
        this.pagedResponse.pageNumber,
        this.pagedResponse.pageSize,
        this.search,
        this.gioiTinhFilter,
        this.trangThaiFilter
      )
      .subscribe({
        next: (response: PagedResponse<KhachHangResponse>) => {
          this.pagedResponse = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  reloadFilter(): void {
    // this.trangThaiFilter = [0, 1];
    // this.gioiTinhFilter = [0, 1];
    // this.onChangeFilter();
    location.reload();
  }
  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }
  public timKiem(e: any): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
 
    this.timeout = setTimeout(() => {
      this.goToPage(
        this.pagedResponse.pageNumber,
        this.pagedResponse.pageSize,
        e.target.value
      );
    }, 500);
  }
  // private function
  private getKhachHangList(): void {
    this.khachHangService.getAll().subscribe({
      next: (response: PagedResponse<KhachHangResponse>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public openDetailsForm(id: number): void {
    this.khachHangService.getById(id).subscribe({
      next: (response) => {
        this.khachHangDetail = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
