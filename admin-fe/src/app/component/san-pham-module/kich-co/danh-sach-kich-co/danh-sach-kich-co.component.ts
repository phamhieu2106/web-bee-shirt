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
  public searchKeyword = "";
  public selectedDetails: KichCo;

  public isLoadding = false;
  public overlayText: string = "";

  // constructor, ngOn
  constructor(
    private kichCoService: KichCoService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.turnOnOverlay("Đang tải");
    this.getSizeList();
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
          error: (errRes: HttpErrorResponse) => {
            this.notifService.error(errRes.error.message);
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
    this.kichCoService.getByPage(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KichCo>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 4
  public changePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.searchKeyword);
  }

  // 5
  public searchByName(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.searchKeyword);
  }

  // 6
  public openDetailsForm(id: number): void {
    this.kichCoService.getById(id).subscribe({
      next: (response: KichCo) => {
        this.selectedDetails = response;
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }

  // 7
  public openUpdateForm(id: number): void {
    this.kichCoService.getById(id).subscribe({
      next: (response: KichCo) => {
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

  // 8
  public changeStatus(id: number): void {
    this.kichCoService.changeStatus(id).subscribe({
      next: () => {
        this.notifService.success("Cập nhật trạng thái thành công!");
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 9
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
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
          },
        });
      }
    });
  }

  // private functions
  // 2
  private getSizeList(): void {
    this.kichCoService.getByPage().subscribe({
      next: (response: PagedResponse<KichCo>) => {
        this.pagedResponse = response;
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 2
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [Validators.required]),
      trangThai: new FormControl(false),
    });
  }

  // 3
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 4
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }

  // 5
  private customRequiredValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }
}
