import { NgModule } from '@angular/core';

import { SanPhamRoutingModule } from './san-pham-routing.module';
import { DanhSachMauSacComponent } from './mau-sac/danh-sach-mau-sac/danh-sach-mau-sac.component';
import { ThemMauSacComponent } from './mau-sac/them-mau-sac/them-mau-sac.component';

@NgModule({
  declarations: [
    DanhSachMauSacComponent,
    ThemMauSacComponent
  ],
  imports: [SanPhamRoutingModule],
})
export class SanPhamModule {}
