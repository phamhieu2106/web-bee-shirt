import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

import { KieuThietKe } from "src/app/model/class/kieu-thiet-ke.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KieuThietKeService } from "src/app/service/kieu-thiet-ke.service";

@Component({
  selector: "app-danh-sach-kieu-thiet-ke",
  templateUrl: "./danh-sach-kieu-thiet-ke.component.html",
  styleUrls: ["./danh-sach-kieu-thiet-ke.component.css"],
})
export class DanhSachKieuThietKeComponent {
  public pagedResponse: PagedResponse<KieuThietKe>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public search = "";
  public selectedDetails: KieuThietKe;

  constructor(
    private thietKeService: KieuThietKeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCoAoList();
    this.initAddForm();
    this.initUpdateForm();
  }

  // public function
  public add(): void {
    let trimmed = this.addForm.get("ten").value.trim();
    this.addForm.get("ten")?.setValue(trimmed);

    this.thietKeService.add(this.addForm.value).subscribe({
      next: (response: KieuThietKe) => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.initAddForm();
        Swal.fire({
          icon: "success",
          title: `Thêm thành công '${response.ten}'!`,
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("closeBtn").click();
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.message, "Hệ thống");
      },
    });
  }

  public initAddForm(): void {
    this.addForm = new FormGroup({
      ten: new FormControl("", [Validators.required]),
    });
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.thietKeService.getByPage(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KieuThietKe>) => {
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

  public timKiem(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.search);
  }

  public onClearSearchInput(): void {
    this.goToPage();
  }

  public openDetailsForm(id: number): void {
    this.thietKeService.getById(id).subscribe({
      next: (response: KieuThietKe) => {
        console.log("tay ao:", response);

        this.selectedDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public openUpdateForm(id: number): void {
    this.thietKeService.getById(id).subscribe({
      next: (response: KieuThietKe) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ten, [Validators.required]),
          trangThai: new FormControl(response.trangThai),
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public changeStatus(id: number): void {
    this.thietKeService.changeStatus(id).subscribe({
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
    let trimmed = this.updateForm.get("ten").value.trim();
    this.updateForm.get("ten")?.setValue(trimmed);

    this.thietKeService.update(this.updateForm.value).subscribe({
      next: (response: KieuThietKe) => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.initUpdateForm();
        Swal.fire({
          icon: "success",
          title: `Cập nhật thành công '${response.ten}'!`,
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("closeUpdateBtn").click();
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.message, "Hệ thống");
      },
    });
  }

  // private function
  private getCoAoList(): void {
    this.thietKeService.getByPage().subscribe({
      next: (response: PagedResponse<KieuThietKe>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [Validators.required]),
      trangThai: new FormControl(false),
    });
  }
}
