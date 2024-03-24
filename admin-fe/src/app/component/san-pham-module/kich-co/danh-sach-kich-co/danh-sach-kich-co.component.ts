import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import Swal, { SweetAlertResult } from "sweetalert2";

import { KichCo } from "src/app/model/class/kich-co.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KichCoService } from "src/app/service/kick-co.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-danh-sach-kich-co",
  templateUrl: "./danh-sach-kich-co.component.html",
  styleUrls: ["./danh-sach-kich-co.component.css"],
})
export class DanhSachKichCoComponent {
  public pagedResponse: PagedResponse<KichCo>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public search = "";
  public selectedDetails: KichCo;

  // constructor, ngOn
  constructor(
    private kichCoService: KichCoService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getKichCoList();
    this.initAddForm();
    this.initUpdateForm();
  }

  // public functions
  //
  public add(): void {
    Swal.fire({
      title: "Thêm kích cỡ?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        let trimmed = this.addForm.get("ten").value.trim();
        this.addForm.get("ten")?.setValue(trimmed);

        this.kichCoService.add(this.addForm.value).subscribe({
          next: (response: KichCo) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initAddForm();
            document.getElementById("closeBtn").click();
            this.notifService.success("Thêm thành công!");
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.notifService.error(errorResponse.error.message);
          },
        });
      }
    });
  }

  //
  public initAddForm(): void {
    this.addForm = new FormGroup({
      ten: new FormControl("", [Validators.required]),
    });
  }

  //
  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.kichCoService.getByPage(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KichCo>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public changePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  //
  public searchByName(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.search);
  }

  //
  public openDetailsForm(id: number): void {
    this.kichCoService.getById(id).subscribe({
      next: (response: KichCo) => {
        this.selectedDetails = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public openUpdateForm(id: number): void {
    this.kichCoService.getById(id).subscribe({
      next: (response: KichCo) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ten, [Validators.required]),
          trangThai: new FormControl(response.trangThai),
        });
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public changeStatus(id: number): void {
    this.kichCoService.changeStatus(id).subscribe({
      next: (response: string) => {
        this.notifService.error(response);
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  public update(): void {
    Swal.fire({
      title: "Cập nhật kích cỡ?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        let trimmed = this.updateForm.get("ten").value.trim();
        this.updateForm.get("ten")?.setValue(trimmed);

        this.kichCoService.update(this.updateForm.value).subscribe({
          next: (response: KichCo) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initUpdateForm();
            document.getElementById("closeUpdateBtn").click();
            this.notifService.success("Cập nhật thành công!");
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.notifService.error(errorResponse.error.message);
          },
        });
      }
    });
  }

  // private functions
  //
  private getKichCoList(): void {
    this.kichCoService.getByPage().subscribe({
      next: (response: PagedResponse<KichCo>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [Validators.required]),
      trangThai: new FormControl(false),
    });
  }
}
