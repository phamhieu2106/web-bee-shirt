import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DanhSachPhieuComponent} from "./danh-sach-phieu/danh-sach-phieu.component";
import {ThemPhieuComponent} from "./them-phieu/them-phieu.component";

const phieuGiamGiaRoutes: Routes = [
  {path:"phieu-giam-gia/ds-phieu-giam-gia",
    component:DanhSachPhieuComponent
  },
  {path:"phieu-giam-gia/them-phieu",
    component:ThemPhieuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(phieuGiamGiaRoutes)],
  exports: [RouterModule],
})
export class PhieuGiamGiaRoutingModule {}
