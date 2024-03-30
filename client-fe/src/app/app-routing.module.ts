import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { SanPhamChiTietComponent } from "./components/san-pham-chi-tiet/san-pham-chi-tiet.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
