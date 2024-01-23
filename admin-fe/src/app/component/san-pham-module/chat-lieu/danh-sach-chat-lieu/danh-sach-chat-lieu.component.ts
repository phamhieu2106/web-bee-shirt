import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";

import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { ChatLieuService } from "src/app/service/chat-lieu.service";

@Component({
  selector: "app-danh-sach-chat-lieu",
  templateUrl: "./danh-sach-chat-lieu.component.html",
  styleUrls: ["./danh-sach-chat-lieu.component.css"],
})
export class DanhSachChatLieuComponent {
  public chatLieus: ChatLieu[] = [];

  constructor(private chatLieuService: ChatLieuService) {}

  ngOnInit(): void {
    this.getChatLieuList();
  }

  //
  private getChatLieuList(): void {
    this.chatLieuService.getAll().subscribe({
      next: (response: PagedResponse<ChatLieu>) => {
        this.chatLieus = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
