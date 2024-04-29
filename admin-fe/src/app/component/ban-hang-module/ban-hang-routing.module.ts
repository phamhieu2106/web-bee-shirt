import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BanHangComponent } from "./ban-hang/ban-hang.component";
import { authenticationGuard } from "src/app/guard/authentication.guard";

const BanHangRoutes: Routes = [
  {
    path: "ban-hang",
    component: BanHangComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(BanHangRoutes)],
  exports: [RouterModule],
})
export class BanHangRoutingModule {}
