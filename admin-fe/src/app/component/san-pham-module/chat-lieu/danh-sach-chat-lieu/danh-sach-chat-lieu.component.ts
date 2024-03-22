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
  public search = "";
  public selectedDetails: ChatLieu;

  // constructor, ngOn
  constructor(
    private chatLieuService: ChatLieuService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getChatLieuList();
    this.initAddForm();
    this.initUpdateForm();
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
      ten: new FormControl("", [Validators.required]),
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
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  // 4
  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  //
  public searchByName(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.search);
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
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  //
  public openUpdateForm(id: number): void {
    this.chatLieuService.getById(id).subscribe({
      next: (response: ChatLieu) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ten, [Validators.required]),
          trangThai: new FormControl(response.trangThai),
        });
      },
      error: (errorResponse: HttpErrorResponse) => {},
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
      error: (errorResponse: HttpErrorResponse) => {},
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
          error: (errorResponse: HttpErrorResponse) => {},
        });
      }
    });
  }

  // private function
  //
  private getChatLieuList(): void {
    this.chatLieuService.getByPage().subscribe({
      next: (response: PagedResponse<ChatLieu>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
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
