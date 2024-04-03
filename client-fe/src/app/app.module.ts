import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CurrencyPipe } from "@angular/common";

import { ToastrModule } from "ngx-toastr";
import { CarouselModule } from "ngx-owl-carousel-o";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { PhieuGiamGiaComponent } from "./component/phieu-giam-gia/phieu-giam-gia.component";
import { DotGiamGiaComponent } from "./component/dot-giam-gia/dot-giam-gia.component";
import { SanPhamChiTietComponent } from "./components/san-pham-chi-tiet/san-pham-chi-tiet.component";
import { SanPhamComponent } from "./components/san-pham/san-pham.component";
import { TaiKhoanComponent } from "./component/tai-khoan/tai-khoan.component";
import { KhachHangComponent } from "./component/tai-khoan/khach-hang/khach-hang.component";
import { LoginComponent } from "./components/log-in/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthenticationInterceptor } from "./interceptor/authentication.interceptor";
import { CheckoutComponent } from "./components/check-out/checkout.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    PhieuGiamGiaComponent,
    DotGiamGiaComponent,
    SanPhamChiTietComponent,
    SanPhamComponent,
    TaiKhoanComponent,
    KhachHangComponent,
    LoginComponent,
    CheckoutComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    CarouselModule,
  ],
  providers: [
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
