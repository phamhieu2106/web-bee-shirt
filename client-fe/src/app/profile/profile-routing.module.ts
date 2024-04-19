import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MyAccountComponent } from "./my-account/my-account.component";
import { MyAddressesComponent } from "./my-addresses/my-addresses.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { MyDiscountsComponent } from "./my-discounts/my-discounts.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { PasswordComponent } from "./password/password.component";
import { authenticationGuard } from "../guard/authentication.guard";

const routes: Routes = [
  {
    path: "profile/my-account",
    component: MyAccountComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "profile/my-addresses",
    component: MyAddressesComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "profile/my-orders",
    component: MyOrdersComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "profile/order-tracking/:orderCode",
    component: OrderTrackingComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "profile/my-discounts",
    component: MyDiscountsComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: "profile/change-password",
    component: PasswordComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
