import { NgModule } from '@angular/core';

import { PhieuGiamGiaRoutingModule } from './phieu-giam-gia-routing.module';
import { DanhSachPhieuComponent } from './danh-sach-phieu/danh-sach-phieu.component';
import { ThemPhieuComponent } from './them-phieu/them-phieu.component';

@NgModule({
  declarations: [
    DanhSachPhieuComponent,
    ThemPhieuComponent
  ],
  imports: [PhieuGiamGiaRoutingModule],
})
export class PhieuGiamGiaModule {}
