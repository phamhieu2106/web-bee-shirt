import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DotGiamGiaComponent } from "./dot-giam-gia/dot-giam-gia.component";
import { ThemDotGiamGiaComponent } from "./them-dot-giam-gia/them-dot-giam-gia.component";

const dotGiamGiaRoutes: Routes = [
  {
    path: "dot-giam-gia/ds-dot-giam-gia",
    component: DotGiamGiaComponent,
  },
  {
    path: "dot-giam-gia/them-dot-giam-gia",
    component: ThemDotGiamGiaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(dotGiamGiaRoutes)],
  exports: [RouterModule],
})
export class DotGiamGiaRoutingModule {}
