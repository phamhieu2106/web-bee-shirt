import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "src/app/service/authentication.service";
import { NotifService } from "src/app/service/notif.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"],
})
export class ForgetPasswordComponent {
  public email: string;
  public isLoadding = false;
  public overlayText: string = "";

  // constructor, ngOn
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notifService: NotificationService
  ) {}

  // public functions
  // 1
  public sendEmail(): void {
    this.turnOnOverlay("Vui lòng đợi...");
    this.authService.checkEmailForForgetPassword(this.email).subscribe({
      next: () => {
        this.notifService.success("Kiểm tra email của bạn để lấy mã xác nhận!");
        this.router.navigate([`/change-password/${this.email}`]);
        this.turnOffOverlay("");
      },
      error: (errRes: HttpErrorResponse) => {
        this.notifService.error(errRes.error.message);
        this.turnOffOverlay("");
      },
    });
  }

  // private functions
  // 1
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 2
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
