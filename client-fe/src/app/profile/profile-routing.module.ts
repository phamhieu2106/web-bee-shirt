import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyAccountComponent } from "./my-account/my-account.component";
import { MyAddressesComponent } from "./my-addresses/my-addresses.component";

const routes: Routes = [
  {
    path: "profile/my-account",
    component: MyAccountComponent,
  },
  {
    path: "profile/my-addresses",
    component: MyAddressesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
