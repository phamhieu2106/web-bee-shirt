import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetDiaChiVaPhiVanChuyenComponent } from "./get-dia-chi-va-phi-van-chuyen/get-dia-chi-va-phi-van-chuyen.component";
import { FormsModule } from "@angular/forms";
import { ProductImageComponent } from "./product-image/product-image.component";
import { InputNumberComponent } from "./input-number/input-number.component";
import { LayoutModule } from "../layout-module/layout.module";

@NgModule({
  declarations: [
    GetDiaChiVaPhiVanChuyenComponent,
    ProductImageComponent,
    InputNumberComponent,
  ],
  imports: [CommonModule, FormsModule, LayoutModule],
  exports: [
    GetDiaChiVaPhiVanChuyenComponent,
    ProductImageComponent,
    InputNumberComponent,
  ],
})
export class CommonComponentModule {}
