import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component } from "@angular/core";

import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { ChatLieuService } from "src/app/service/chat-lieu.service";
import Swal from "sweetalert2";

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

  constructor(private chatLieuService: ChatLieuService) {}

  ngOnInit(): void {
    this.getChatLieuList();
    this.initAddForm();
    this.initUpdateForm();
  }

  // public function
  public add(): void {
    this.chatLieuService.add(this.addForm.value).subscribe({
      next: (response: ChatLieu) => {
        this.getChatLieuList();
        this.initAddForm();
        Swal.fire({
          icon: "success",
          title: `Thêm thành công '${response.ten}'!`,
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
    this.chatLieuService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<ChatLieu>) => {
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
    this.chatLieuService.getById(id).subscribe({
      next: (response: ChatLieu) => {
        this.selectedDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public openUpdateForm(id: number): void {
    this.chatLieuService.getById(id).subscribe({
      next: (response: ChatLieu) => {
        this.updateForm = new FormGroup({
          ten: new FormControl(response.ten, [Validators.required]),
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  // private function
  private getChatLieuList(): void {
    this.chatLieuService.getAll().subscribe({
      next: (response: PagedResponse<ChatLieu>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      ten: new FormControl("", [Validators.required]),
    });
  }
}
