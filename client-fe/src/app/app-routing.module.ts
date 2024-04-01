import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "./components/home-page/home-page.component";
import { SanPhamChiTietComponent } from "./components/san-pham-chi-tiet/san-pham-chi-tiet.component";
import { SanPhamComponent } from "./components/san-pham/san-pham.component";
import { TaiKhoanComponent } from "./component/tai-khoan/tai-khoan.component";
import { LoginComponent } from "./components/login/login.component";

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
    path: "login",
    component: LoginComponent,
  },
  {
    path: "tai-khoan",
    component: TaiKhoanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
