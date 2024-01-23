import { Component } from "@angular/core";

import { AuthenticationService } from "./service/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public isLoggin = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.isLoggedInSubject.subscribe({
      next: (value: boolean) => {
        this.isLoggin = value;
      },
    });
  }
}
