import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
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
  private timeout: any;

  // FILTER
  public trangThaiFilter: number[] = [0, 1];
  public gioiTinhFilter: number[] = [0, 1];

  constructor(
    private nhanVienService: NhanVienService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllNhanVien();
  }

  onChangeFilter() {
    this.nhanVienService
      .filter(
        this.pagedResponse.pageNumber,
        this.pagedResponse.pageSize,
        this.search,
        this.gioiTinhFilter,
        this.trangThaiFilter
      )
      .subscribe({
        next: (response: PagedResponse<NhanVienResponse>) => {
          this.pagedResponse = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  reloadFilter(): void {
    this.trangThaiFilter = [0, 1];
    this.gioiTinhFilter = [0, 1];
    this.onChangeFilter();
  }

  // private function
  private getAllNhanVien(): void {
    this.nhanVienService.getAll().subscribe({
      next: (response: PagedResponse<NhanVienResponse>) => {
        this.pagedResponse = response;
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
        console.log(this.nhanVienDetails)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
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

  public deleteNV(id: number): void {
    this.nhanVienService.delete(id).subscribe({
      next: () => {
        this.toastr.success("Cập nhật trạng thái thành công", "Thành công");
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.success("Cập nhật trạng thái thất bại", "Thành công");
        console.log(error);
      },
    });
  }
}
