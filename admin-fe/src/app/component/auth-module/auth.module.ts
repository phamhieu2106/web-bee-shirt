import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../layout-module/layout.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
})
export class AuthModule {}
