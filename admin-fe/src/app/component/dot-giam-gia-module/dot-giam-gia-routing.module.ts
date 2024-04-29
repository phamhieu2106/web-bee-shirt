import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DotGiamGiaComponent } from "./dot-giam-gia/dot-giam-gia.component";
import { ThemDotGiamGiaComponent } from "./them-dot-giam-gia/them-dot-giam-gia.component";
import { CapNhatDotGiamGiaComponent } from "./cap-nhat-dot-giam-gia/cap-nhat-dot-giam-gia.component";
import { adminAuthenticationGuard } from "src/app/guard/admin-guard.guard";

const dotGiamGiaRoutes: Routes = [
  {
    path: "dot-giam-gia/ds-dot-giam-gia",
    component: DotGiamGiaComponent,
    canActivate: [adminAuthenticationGuard],
  },
  {
    path: "dot-giam-gia/them-dot-giam-gia",
    component: ThemDotGiamGiaComponent,
    canActivate: [adminAuthenticationGuard],
  },
  {
    path: "dot-giam-gia/cap-nhat-dot-giam-gia/:id",
    component: CapNhatDotGiamGiaComponent,
    canActivate: [adminAuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dotGiamGiaRoutes)],
  exports: [RouterModule],
})
export class DotGiamGiaRoutingModule {}
