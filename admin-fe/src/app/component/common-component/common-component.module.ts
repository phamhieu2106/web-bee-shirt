import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetDiaChiVaPhiVanChuyenComponent } from "./get-dia-chi-va-phi-van-chuyen/get-dia-chi-va-phi-van-chuyen.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [GetDiaChiVaPhiVanChuyenComponent],
  imports: [CommonModule, FormsModule],
  exports: [GetDiaChiVaPhiVanChuyenComponent],
})
export class CommonComponentModule {}
