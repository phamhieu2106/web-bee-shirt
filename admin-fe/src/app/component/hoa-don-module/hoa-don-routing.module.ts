import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const hoaDonRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(hoaDonRoutes)],
  exports: [RouterModule],
})
export class HoaDonRoutingModule {}
