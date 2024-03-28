import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TraHangComponent } from "./tra-hang/tra-hang.component";
import { authenticationGuard } from "src/app/guard/authentication.guard";
import { TraHangThanhCongComponent } from "./tra-hang-thanh-cong/tra-hang-thanh-cong.component";

const routes: Routes = [
  {
    path: "tra-hang",
    component: TraHangComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "tra-hang-thanh-cong",
    component: TraHangThanhCongComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraHangRoutingModule {}
