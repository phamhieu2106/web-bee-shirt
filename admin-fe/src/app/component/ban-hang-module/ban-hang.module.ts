import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BanHangComponent } from "./ban-hang/ban-hang.component";
import { BanHangRoutingModule } from "./ban-hang-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LayoutModule } from "../layout-module/layout.module";
import { CommonComponentModule } from "../common-component/common-component.module";

@NgModule({
  declarations: [BanHangComponent],
  imports: [
    CommonModule,
    BanHangRoutingModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    CommonComponentModule,
    ReactiveFormsModule,
  ],
})
export class BanHangModule {}
