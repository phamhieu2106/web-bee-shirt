import { Component } from "@angular/core";

import Swal, { SweetAlertResult } from "sweetalert2";

import { Customer } from "src/app/model/class/customer.class";
import { AuthenticationService } from "src/app/service/authentication.service";
import { CustomerService } from "src/app/service/customer.service";
import { NotificationService } from "src/app/service/notification.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-profile-sidebar",
  templateUrl: "./profile-sidebar.component.html",
  styleUrls: ["./profile-sidebar.component.css"],
})
export class ProfileSidebarComponent {
  public isLoadding = false;
  public overlayText: string = "";
  public loggedCust: Customer;
  public selectFile: File;

  constructor(
    private authService: AuthenticationService,
    private notifService: NotificationService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loggedCust = this.authService.getCustomerFromStorage();
  }

  // public functions
  //
  public openFileInput(): void {
    document.getElementById("fileInput").click();
  }

  //
  public imageChange(event: any, thumnailId: string): void {
    this.selectFile = event.target["files"][0];
    this.showImageThumbnail(this.selectFile, thumnailId);
    this.notifService.success(
      "Bạn vừa chọn ảnh diện mới! Nhấn cập nhật để lưu thay đổi."
    );
  }

  //
  public cancelUpdateAvatar(): void {
    this.selectFile = null;
    (document.getElementById("avatar") as HTMLImageElement)["src"] =
      this.loggedCust.image.imageUrl;
    this.notifService.success("Bạn đã hủy cập nhật ảnh!");
  }

  //
  public updateAvatar(): void {
    Swal.fire({
      title: "Cập nhật ảnh đại diện?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.turnOnOverlay("Đang cập nhật...");
        this.customerService
          .updateAvatar(this.loggedCust.id, this.selectFile)
          .subscribe({
            next: (cust: Customer) => {
              this.authService.saveCustomerToStorage(cust);
              this.selectFile = null;
              this.notifService.success("Cập nhật ảnh đại diện thành công!");
              this.turnOffOverlay("");
            },
            error: (errRes: HttpErrorResponse) => {
              this.notifService.error(errRes.error.message);
              this.turnOffOverlay("");
            },
          });
      }
    });
  }

  // private functions
  //
  private showImageThumbnail(file: File, thumnailId: string): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      (document.getElementById(thumnailId) as HTMLImageElement)["src"] = e
        .target.result as string;
    };
    reader.readAsDataURL(file);
  }

  //
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 15
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
