import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component } from "@angular/core";

import Swal, { SweetAlertResult } from "sweetalert2";

import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { ChatLieuService } from "src/app/service/chat-lieu.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-danh-sach-chat-lieu",
  templateUrl: "./danh-sach-chat-lieu.component.html",
  styleUrls: ["./danh-sach-chat-lieu.component.css"],
})
export class DanhSachChatLieuComponent {
  public pagedResponse: PagedResponse<ChatLieu>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public searchKeyword = "";
  public selectedDetails: ChatLieu;

  public isLoadding = false;
  public overlayText: string = "";

  // constructor, ngOn
  constructor(
    private chatLieuService: ChatLieuService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.turnOnOverlay("Đang tải");
    this.getMaterialList();
    this.initAddForm();
    this.initUpdateForm();

    setTimeout(() => {
      this.turnOffOverlay("");
    }, 500);
  }

  // public function
  // 1
  public add(): void {
    Swal.fire({
      title: "Thêm chất liệu?",
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

        this.chatLieuService.add(this.addForm.value).subscribe({
          next: (response: ChatLieu) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initAddForm();
            document.getElementById("closeAddModalBtn").click();
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
    pageNumber: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.chatLieuService.getByPage(pageNumber, pageSize, keyword).subscribe({
      next: (response: PagedResponse<ChatLieu>) => {
        this.pagedResponse = response;
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }

  // 4
  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.searchKeyword);
  }

  //
  public searchByName(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.searchKeyword);
  }

  //
  public onClearSearchInput(): void {
    this.goToPage();
  }

  //
  public openDetailsForm(id: number): void {
    this.chatLieuService.getById(id).subscribe({
      next: (response: ChatLieu) => {
        this.selectedDetails = response;
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }

  //
  public openUpdateForm(id: number): void {
    this.chatLieuService.getById(id).subscribe({
      next: (response: ChatLieu) => {
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
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }

  //
  public changeStatus(id: number): void {
    this.chatLieuService.changeStatus(id).subscribe({
      next: (response: string) => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.notifService.success(response);
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }

  //
  public update(): void {
    Swal.fire({
      title: "Cập nhật chất liệu?",
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

        this.chatLieuService.update(this.updateForm.value).subscribe({
          next: (response: ChatLieu) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initUpdateForm();
            document.getElementById("updateCloseBtn").click();
            this.notifService.success("Cập nhật thành công!");
          },
          error: (errRes: HttpErrorResponse) => {
            this.notifService.error(errRes.error.message);
          },
        });
      }
    });
  }

  // private function
  // 1
  private getMaterialList(): void {
    this.chatLieuService.getByPage().subscribe({
      next: (response: PagedResponse<ChatLieu>) => {
        this.pagedResponse = response;
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
      },
    });
  }

  // 2
  private initUpdateForm(): void {
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
