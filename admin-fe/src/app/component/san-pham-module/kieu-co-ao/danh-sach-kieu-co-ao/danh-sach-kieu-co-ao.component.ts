import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import Swal, { SweetAlertResult } from "sweetalert2";

import { CoAo } from "src/app/model/class/co-ao.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KieuCoAoService } from "src/app/service/kieu-co-ao.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-danh-sach-kieu-co-ao",
  templateUrl: "./danh-sach-kieu-co-ao.component.html",
  styleUrls: ["./danh-sach-kieu-co-ao.component.css"],
})
export class DanhSachKieuCoAoComponent {
  public pagedResponse: PagedResponse<CoAo>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public searchKeyword = "";
  public selectedDetails: CoAo;

  public isLoadding = false;
  public overlayText: string = "";

  // constructor, ngOn
  constructor(
    private coAoService: KieuCoAoService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.turnOnOverlay("Đang tải");
    this.getCoAoList();
    this.initAddForm();
    this.initUpdateForm();

    setTimeout(() => {
      this.turnOffOverlay("");
    }, 500);
  }

  // public functions
  // 1
  public add(): void {
    Swal.fire({
      title: "Thêm kiểu cổ áo?",
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

        this.coAoService.add(this.addForm.value).subscribe({
          next: (response: CoAo) => {
            this.goToPage(1, this.pagedResponse.pageSize, "");
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

  // 2
  public initAddForm(): void {
    this.addForm = new FormGroup({
      ten: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-ZÀ-ỹ0-9\\s]+$"),
      ]),
    });
  }

  // 3
  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.coAoService.getByPage(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<CoAo>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.searchKeyword);
  }

  //
  public searchByName(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.searchKeyword);
  }

  //
  public openDetailsForm(id: number): void {
    this.coAoService.getById(id).subscribe({
      next: (response: CoAo) => {
        this.selectedDetails = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public openUpdateForm(id: number): void {
    this.coAoService.getById(id).subscribe({
      next: (response: CoAo) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ten, [
            Validators.required,
            this.customRequiredValidator,
            Validators.pattern("^[a-zA-ZÀ-ỹ0-9\\s]+$"),
          ]),
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
    this.coAoService.changeStatus(id).subscribe({
      next: (response: string) => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.notifService.success(response);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  public update(): void {
    Swal.fire({
      title: "Cập nhật kiểu cổ áo?",
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

        this.coAoService.update(this.updateForm.value).subscribe({
          next: (response: CoAo) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initUpdateForm();
            document.getElementById("updateCloseBtn").click();
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
  private getCoAoList(): void {
    this.coAoService.getByPage().subscribe({
      next: (response: PagedResponse<CoAo>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  //
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-ZÀ-ỹ0-9\\s]+$"),
      ]),
      trangThai: new FormControl(false),
    });
  }

  //
  private customRequiredValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }

  //
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  //
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
