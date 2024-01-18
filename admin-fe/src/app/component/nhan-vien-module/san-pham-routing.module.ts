import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const nhanVienRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(nhanVienRoutes)],
  exports: [RouterModule],
})
export class NhanVienRoutingModule {}
