import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BanHangComponent } from "./ban-hang/ban-hang.component";

const BanHangRoutes: Routes = [
  {
    path: "ban-hang",
    component: BanHangComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(BanHangRoutes)],
  exports: [RouterModule],
})
export class BanHangRoutingModule {}
