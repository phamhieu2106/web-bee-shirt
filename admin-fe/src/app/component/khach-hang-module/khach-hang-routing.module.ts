import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachKhachHangComponent } from './danh-sach-khach-hang/danh-sach-khach-hang.component';
import { KhachHangDetailComponent } from './khach-hang-detail/khach-hang-detail.component';

const khachHangRoutes: Routes = [
  {
    path: 'khach-hang/ds-khach-hang',
    component: DanhSachKhachHangComponent,
  },
  {
    path: 'khach-hang/:id',
    component: KhachHangDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(khachHangRoutes)],
  exports: [RouterModule],
})
export class KhachHangRoutingModule {}
