import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "./components/home-page/home-page.component";
import { SanPhamChiTietComponent } from "./components/san-pham-chi-tiet/san-pham-chi-tiet.component";
import { SanPhamComponent } from "./components/san-pham/san-pham.component";
import { LoginComponent } from "./components/log-in/login.component";
import { CheckoutComponent } from "./components/check-out/checkout.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { CheckOut2Component } from "./components/check-out2/check-out2.component";
import { TrackingComponent } from "./components/tracking/tracking.component";
import { LienHeComponent } from "./components/lien-he/lien-he.component";
import { VeChungToiComponent } from "./components/ve-chung-toi/ve-chung-toi.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { VnpaySuccessComponent } from "./components/vnpay-success/vnpay-success.component";

const routes: Routes = [
  { path: "", redirectTo: "homepage", pathMatch: "full" },
  {
    path: "homepage",
    component: HomePageComponent,
  },
  {
    path: "san-pham/:id",
    component: SanPhamChiTietComponent,
  },
  {
    path: "trang-san-pham",
    component: SanPhamComponent,
  },
  {
    path: "log-in",
    component: LoginComponent,
  },
  {
    path: "check-out",
    component: CheckoutComponent,
  },
  {
    path: "check-out2",
    component: CheckOut2Component,
  },
  {
    path: "sign-up",
    component: SignUpComponent,
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent,
  },
  {
    path: "tracking",
    component: TrackingComponent,
  },
  {
    path: "lien-he",
    component: LienHeComponent,
  },
  {
    path: "ve-chung-toi",
    component: VeChungToiComponent,
  },
  {
    path: "change-password/:email",
    component: ChangePasswordComponent,
  },
  {
    path: "vnpay-success",
    component: VnpaySuccessComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
