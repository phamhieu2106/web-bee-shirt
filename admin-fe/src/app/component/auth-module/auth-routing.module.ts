import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const authRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
