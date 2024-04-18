import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ProfileRoutingModule } from "./profile-routing.module";
import { MyAccountComponent } from "./my-account/my-account.component";
import { MyAddressesComponent } from "./my-addresses/my-addresses.component";
import { ProfileSidebarComponent } from "./profile-sidebar/profile-sidebar.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { MyDiscountsComponent } from "./my-discounts/my-discounts.component";
import { PasswordComponent } from "./password/password.component";
import { OverlayComponent } from "./overlay/overlay.component";

@NgModule({
  declarations: [
    MyAccountComponent,
    MyAddressesComponent,
    ProfileSidebarComponent,
    MyOrdersComponent,
    OrderTrackingComponent,
    MyDiscountsComponent,
    PasswordComponent,
    OverlayComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, ReactiveFormsModule],
  exports: [OverlayComponent],
})
export class ProfileModule {}
