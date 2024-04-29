import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DanhSachPhieuComponent } from "./danh-sach-phieu/danh-sach-phieu.component";
import { ThemPhieuComponent } from "./them-phieu/them-phieu.component";
import { SuaPhieuComponent } from "./sua-phieu/sua-phieu.component";
import { adminAuthenticationGuard } from "src/app/guard/admin-guard.guard";

const phieuGiamGiaRoutes: Routes = [
  {
    path: "phieu-giam-gia/ds-phieu-giam-gia",
    component: DanhSachPhieuComponent,
    canActivate: [adminAuthenticationGuard],
  },
  {
    path: "phieu-giam-gia/them-phieu",
    component: ThemPhieuComponent,
    canActivate: [adminAuthenticationGuard],
  },
  {
    path: "phieu-giam-gia/sua-phieu/:id",
    component: SuaPhieuComponent,
    canActivate: [adminAuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(phieuGiamGiaRoutes)],
  exports: [RouterModule],
})
export class PhieuGiamGiaRoutingModule {}
