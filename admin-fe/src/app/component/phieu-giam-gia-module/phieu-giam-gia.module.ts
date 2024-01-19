import { NgModule } from '@angular/core';

import { PhieuGiamGiaRoutingModule } from './phieu-giam-gia-routing.module';
import { DanhSachPhieuComponent } from './danh-sach-phieu/danh-sach-phieu.component';

@NgModule({
  declarations: [
    DanhSachPhieuComponent
  ],
  imports: [PhieuGiamGiaRoutingModule],
})
export class PhieuGiamGiaModule {}
