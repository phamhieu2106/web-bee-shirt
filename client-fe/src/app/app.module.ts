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
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { PhieuGiamGiaComponent } from "./child-component/phieu-giam-gia/phieu-giam-gia.component";
import { DotGiamGiaComponent } from "./child-component/dot-giam-gia/dot-giam-gia.component";
import { SanPhamChiTietComponent } from "./components/san-pham-chi-tiet/san-pham-chi-tiet.component";
import { SanPhamComponent } from "./components/san-pham/san-pham.component";
import { LoginComponent } from "./components/log-in/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationInterceptor } from "./interceptor/authentication.interceptor";
import { CheckoutComponent } from "./components/check-out/checkout.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ProfileModule } from "./profile/profile.module";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { CheckOut2Component } from "./components/check-out2/check-out2.component";
import { TrackingComponent } from "./components/tracking/tracking.component";
import { LienHeComponent } from "./components/lien-he/lien-he.component";
import { VeChungToiComponent } from "./components/ve-chung-toi/ve-chung-toi.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { SearchProductComponent } from "./components/search-product/search-product.component";
import { ProductImageComponent } from "./components/product-image/product-image.component";
import { ActiveDiscountsSpctComponent } from "./child-component/active-discounts-spct/active-discounts-spct.component";
import { VnpaySuccessComponent } from './components/vnpay-success/vnpay-success.component';

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
    LoginComponent,
    CheckoutComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    CheckOut2Component,
    TrackingComponent,
    LienHeComponent,
    VeChungToiComponent,
    ChangePasswordComponent,
    SearchProductComponent,
    ProductImageComponent,
    ActiveDiscountsSpctComponent,
    VnpaySuccessComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    CarouselModule,
    ProfileModule,
    FormsModule,
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
