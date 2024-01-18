import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './component/auth-module/auth.module';
import { SanPhamModule } from './component/san-pham-module/san-pham.module';
import { HoaDonModule } from './component/hoa-don-module/hoa-don.module';
import { KhachHangModule } from './component/khach-hang-module/khach-hang.module';
import { NhanVienModule } from './component/nhan-vien-module/san-pham.module';
import { PhieuGiamGiaModule } from './component/phieu-giam-gia-module/phieu-giam-gia.module';
import { DotGiamGiaModule } from './component/dot-giam-gia-module/auth.module';
import { LayoutModule } from './component/layout-module/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    HoaDonModule,
    KhachHangModule,
    NhanVienModule,
    SanPhamModule,
    PhieuGiamGiaModule,
    DotGiamGiaModule,
    LayoutModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
