import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SanPhamChiTietComponent } from './component/san-pham-chi-tiet/san-pham-chi-tiet.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'cua-hang',
    component: HomePageComponent,
  },
  {
    path: 'san-pham/:id',
    component: SanPhamChiTietComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
