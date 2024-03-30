import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./component/home-page/home-page.component";
import { SanPhamChiTietComponent } from "./components/san-pham-chi-tiet/san-pham-chi-tiet.component";
import { SanPhamComponent } from "./component/san-pham/san-pham.component";
import { TaiKhoanComponent } from "./component/tai-khoan/tai-khoan.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "",
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
    path: "tai-khoan",
    component: TaiKhoanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
