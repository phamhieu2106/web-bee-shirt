import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "./components/home-page/home-page.component";
import { SanPhamChiTietComponent } from "./components/san-pham-chi-tiet/san-pham-chi-tiet.component";
import { SanPhamComponent } from "./components/san-pham/san-pham.component";
import { TaiKhoanComponent } from "./component/tai-khoan/tai-khoan.component";
import { LoginComponent } from "./components/log-in/login.component";
import { CheckoutComponent } from "./components/check-out/checkout.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

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
    path: "tai-khoan",
    component: TaiKhoanComponent,
  },
  ,
  {
    path: "check-out",
    component: CheckoutComponent,
  },
  {
    path: "sign-up",
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
