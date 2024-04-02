import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetDiaChiVaPhiVanChuyenComponent } from "./get-dia-chi-va-phi-van-chuyen/get-dia-chi-va-phi-van-chuyen.component";
import { FormsModule } from "@angular/forms";
import { ProductImageComponent } from "./product-image/product-image.component";
import { SearchProductDetailComponent } from "../ban-hang-module/search-product-detail/search-product-detail.component";
import { InputNumberComponent } from "./input-number/input-number.component";

@NgModule({
  declarations: [
    GetDiaChiVaPhiVanChuyenComponent,
    ProductImageComponent,
    InputNumberComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    GetDiaChiVaPhiVanChuyenComponent,
    ProductImageComponent,
    InputNumberComponent,
  ],
})
export class CommonComponentModule {}
