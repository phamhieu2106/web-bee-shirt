import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { KhachHang } from "src/app/model/class/khach-hang.class";
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

  // public pagedResponse: PagedResponse<KhachHang>;
  // public addForm: FormGroup;
  // public updateForm: FormGroup;
  // public search = "";
  // public selectedDetails: KhachHang;

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

  public onClearSearchInput(): void {
    this.goToPage();
  }

  public khDetail1(id: number) {
    this.router.navigate(["/khach-hang/detail", id]);
  }

  public openUpdateForm(id: number): void {
    this.khachHangService.getById(id).subscribe({
      next: (response: KhachHang) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ho_ten, [Validators.required]),
          trangThai: new FormControl(response.trang_thai),
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public changeStatus(id: number): void {
    this.khachHangService.changeStatus(id).subscribe({
      next: (response: string) => {
        this.toastr.success(response, "");
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public update(): void {
    console.log(this.updateForm.value);
    this.khachHangService.update(this.updateForm.value).subscribe({
      next: (response: KhachHang) => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.initUpdateForm();
        Swal.fire({
          icon: "success",
          title: `Cập nhật thành công '${response.ho_ten}'!`,
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("closeBtn").click();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
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
