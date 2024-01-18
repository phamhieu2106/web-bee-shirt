import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const phieuGiamGiaRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(phieuGiamGiaRoutes)],
  exports: [RouterModule],
})
export class PhieuGiamGiaRoutingModule {}
