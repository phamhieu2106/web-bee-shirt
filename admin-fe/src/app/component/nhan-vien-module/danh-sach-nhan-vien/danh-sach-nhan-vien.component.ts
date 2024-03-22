import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { NhanVienService } from "src/app/service/nhan-vien.service";
import Swal from "sweetalert2";

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

  @ViewChild("inputName") inputNameRef: ElementRef;

  constructor(
    private nhanVienService: NhanVienService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllNhanVien();
  }

  filterObject: any = null;
  pageSize: number = 5;
  pageNumber: number = 1;
  onChangeFilter() {
    this.filterObject = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search,
      gioiTinhFilter: this.gioiTinhFilter,
      trangThaiFilter: this.trangThaiFilter,
    };
    this.goToPage(
      this.filterObject.pageNumber,
      this.filterObject.pageSize,
      this.filterObject.search
    );
  }

  reloadFilter(): void {
    this.search = "";
    this.trangThaiFilter = [0, 1];
    this.gioiTinhFilter = [0, 1];
    this.inputNameRef.nativeElement.value = "";
    this.pageSize = 5;
    this.pageNumber = 1;
    this.getAllNhanVien();
    this.filterObject = null;
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

  public goToPage(page: number, pageSize: number, keyword: string): void {
    if (this.filterObject) {
      this.nhanVienService
        .filter(
          page,
          pageSize,
          keyword,
          this.filterObject.gioiTinhFilter,
          this.filterObject.trangThaiFilter
        )
        .subscribe({
          next: (response: PagedResponse<NhanVienResponse>) => {
            this.pagedResponse = response;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    } else {
      this.nhanVienService.getAll(page, pageSize, keyword).subscribe({
        next: (response: PagedResponse<NhanVienResponse>) => {
          this.pagedResponse = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => {
          console.log(this.pagedResponse);
        },
      });
    }
  }

  public onChangePageSize(): void {
    this.goToPage(this.pageNumber, this.pageSize, this.search);
  }

  public openDetailsForm(id: number): void {
    this.nhanVienService.getOneById(id).subscribe({
      next: (response) => {
        this.nhanVienDetails = response;
        console.log(this.nhanVienDetails);
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
    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý đổi trạng thái không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result) => {
      if (result.isConfirmed) {
        this.nhanVienService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              toast: true,
              icon: "success",
              position: "top-end",
              title: "Cập nhật trạng thái thành công",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire({
              toast: true,
              icon: "error",
              position: "top-end",
              title: "Cập nhật trạng thái thất bại",
              showConfirmButton: false,
              timer: 3000,
            });
            console.log(error);
          },
        });
      }
    });
  }
}
