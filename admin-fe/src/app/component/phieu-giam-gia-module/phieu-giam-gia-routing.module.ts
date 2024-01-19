import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DanhSachPhieuComponent} from "./danh-sach-phieu/danh-sach-phieu.component";

const phieuGiamGiaRoutes: Routes = [
  {path:"phieu-giam-gia/ds-phieu-giam-gia",
    component:DanhSachPhieuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(phieuGiamGiaRoutes)],
  exports: [RouterModule],
})
export class PhieuGiamGiaRoutingModule {}
