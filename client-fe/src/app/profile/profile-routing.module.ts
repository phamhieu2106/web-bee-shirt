import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MyAccountComponent } from "./my-account/my-account.component";
import { MyAddressesComponent } from "./my-addresses/my-addresses.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { MyDiscountsComponent } from "./my-discounts/my-discounts.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { OverlayComponent } from "./overlay/overlay.component";

const routes: Routes = [
  {
    path: "profile/my-account",
    component: MyAccountComponent,
  },
  {
    path: "profile/my-addresses",
    component: MyAddressesComponent,
  },
  {
    path: "profile/my-orders",
    component: MyOrdersComponent,
  },
  {
    path: "profile/order-tracking/:orderCode",
    component: OrderTrackingComponent,
  },
  {
    path: "profile/my-discounts",
    component: MyDiscountsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
