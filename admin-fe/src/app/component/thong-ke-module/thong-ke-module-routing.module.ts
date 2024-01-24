import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ThongKeComponent } from "./thong-ke/thong-ke.component";
import { authenticationGuard } from "src/app/guard/authentication.guard";

const routes: Routes = [
  {
    path: "thong-ke",
    component: ThongKeComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongKeModuleRoutingModule {}
