import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

import { CoAo } from "src/app/model/class/co-ao.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KieuCoAoService } from "src/app/service/kieu-co-ao.service";

@Component({
  selector: "app-danh-sach-kieu-co-ao",
  templateUrl: "./danh-sach-kieu-co-ao.component.html",
  styleUrls: ["./danh-sach-kieu-co-ao.component.css"],
})
export class DanhSachKieuCoAoComponent {
  public pagedResponse: PagedResponse<CoAo>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public search = "";
  public selectedDetails: CoAo;

  constructor(
    private coAoService: KieuCoAoService,
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

    this.coAoService.add(this.addForm.value).subscribe({
      next: (response: CoAo) => {
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
    this.coAoService.getByPage(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<CoAo>) => {
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
    this.coAoService.getById(id).subscribe({
      next: (response: CoAo) => {
        this.selectedDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public openUpdateForm(id: number): void {
    this.coAoService.getById(id).subscribe({
      next: (response: CoAo) => {
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
    this.coAoService.changeStatus(id).subscribe({
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

    this.coAoService.update(this.updateForm.value).subscribe({
      next: (response: CoAo) => {
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
        document.getElementById("updateCloseBtn").click();
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.message, "Hệ thống");
      },
    });
  }

  // private function
  private getCoAoList(): void {
    this.coAoService.getByPage().subscribe({
      next: (response: PagedResponse<CoAo>) => {
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
