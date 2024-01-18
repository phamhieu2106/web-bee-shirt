import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DanhSachMauSacComponent } from './mau-sac/danh-sach-mau-sac/danh-sach-mau-sac.component';
import { ThemMauSacComponent } from './mau-sac/them-mau-sac/them-mau-sac.component';

const sanPhamRoutes: Routes = [
  {
    path: 'mau-sac',
    component: DanhSachMauSacComponent,
    children: [
      { path: 'ds-mau-sac', component: DanhSachMauSacComponent },
      { path: 'them-mau-sac', component: ThemMauSacComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sanPhamRoutes)],
  exports: [RouterModule],
})
export class SanPhamRoutingModule {}
