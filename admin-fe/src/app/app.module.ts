import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CurrencyPipe, registerLocaleData } from "@angular/common";

import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./component/auth-module/auth.module";
import { SanPhamModule } from "./component/san-pham-module/san-pham.module";
import { HoaDonModule } from "./component/hoa-don-module/hoa-don.module";
import { KhachHangModule } from "./component/khach-hang-module/khach-hang.module";
import { NhanVienModule } from "./component/nhan-vien-module/nhan-vien.module";
import { PhieuGiamGiaModule } from "./component/phieu-giam-gia-module/phieu-giam-gia.module";
import { DotGiamGiaModule } from "./component/dot-giam-gia-module/dot-giam-gia.module";
import { LayoutModule } from "./component/layout-module/layout.module";
import { AuthenticationInterceptor } from "./interceptor/authentication.interceptor";
import { BanHangModule } from "./component/ban-hang-module/ban-hang.module";
import { ThongKeModuleModule } from "./component/thong-ke-module/thong-ke-module.module";
import { CarouselModule } from "ngx-owl-carousel-o";

import en from "@angular/common/locales/en";
registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { provideNzI18n, en_US } from "ng-zorro-antd/i18n";
import { TraHangModule } from "./component/tra-hang-module/tra-hang.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot(),

    AuthModule,
    ThongKeModuleModule,
    HoaDonModule,
    KhachHangModule,
    NhanVienModule,
    SanPhamModule,
    PhieuGiamGiaModule,
    DotGiamGiaModule,
    LayoutModule,
    AppRoutingModule,
    BanHangModule,
    TraHangModule,
    CarouselModule,
  ],
  providers: [
    provideNzI18n(en_US),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
