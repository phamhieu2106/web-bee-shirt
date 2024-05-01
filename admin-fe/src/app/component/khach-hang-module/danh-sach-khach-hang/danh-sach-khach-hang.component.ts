import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { KhachHang } from "src/app/model/class/KhachHang.class";
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
  icon: string = "  fa-solid fa-users";
  title: string = "khách hàng";
  mainHeading: string = "khách hàng";

  public pagedResponse: PagedResponse<KhachHangResponse>;
  public search = "";
  public khachHangDetail: KhachHangResponse;
  public khDetail: KhachHangResponse;
  // public formUpdateKH: FormGroup;
  private timeout: any;

  public trangThaiFilter: number[] = [0, 1];
  public gioiTinhFilter: number[] = [0, 1];
  
  @ViewChild("inputName") inputNameRef: ElementRef;
  constructor(
    private khachHangService: KhachHangService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.filterObject = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    search: this.search,
    gioiTinhFilter: [0,1],
    trangThaiFilter: [0,1],
  };
  this.goToPage(
    this.filterObject.pageNumber,
    this.filterObject.pageSize,
    this.filterObject.search
  );    
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
    this.getKhachHangList();
    this.filterObject = null;
  }
  public goToPage(page: number, pageSize: number, keyword: string): void {
    if (this.filterObject) {
      this.khachHangService
        .filter(
          page,
          pageSize,
          keyword,
          this.filterObject.gioiTinhFilter,
          this.filterObject.trangThaiFilter
        )
        .subscribe({
          next: (response: PagedResponse<KhachHangResponse>) => {
            this.pagedResponse = response;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    } else {
      this.khachHangService.getAll(page, pageSize, keyword).subscribe({
        next: (response: PagedResponse<KhachHangResponse>) => {
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



  public khDetail1(id: number) {
    this.router.navigate(["/khach-hang/detail", id]);
  }

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
  public changeSTT(id: number): void {
    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý đổi trạng thái không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result) => {
      if (result.isConfirmed) {
        this.khachHangService.changeSTT(id).subscribe({
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
