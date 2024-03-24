import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SideContentComponent } from "./side-content/side-content.component";
import { MainHeadingComponent } from "./main-heading/main-heading.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideContentComponent,
    MainHeadingComponent,
    OverlayComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideContentComponent,
    MainHeadingComponent,
    OverlayComponent,
    SidebarComponent,
  ],
})
export class LayoutModule {}
