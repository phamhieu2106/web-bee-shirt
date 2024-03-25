import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetDiaChiVaPhiVanChuyenComponent } from "./get-dia-chi-va-phi-van-chuyen/get-dia-chi-va-phi-van-chuyen.component";
import { FormsModule } from "@angular/forms";
import { ProductImageComponent } from "./product-image/product-image.component";
import { SearchProductDetailComponent } from "../ban-hang-module/search-product-detail/search-product-detail.component";

@NgModule({
  declarations: [GetDiaChiVaPhiVanChuyenComponent, ProductImageComponent],
  imports: [CommonModule, FormsModule],
  exports: [GetDiaChiVaPhiVanChuyenComponent, ProductImageComponent],
})
export class CommonComponentModule {}
