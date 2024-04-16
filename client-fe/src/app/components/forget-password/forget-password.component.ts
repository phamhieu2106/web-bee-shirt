import { Component } from "@angular/core";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"],
})
export class ForgetPasswordComponent {
  public email: string;

  // public functions
  // 1
  public sendEmail(): void {
    console.log("email:", this.email);
  }
}
