import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SideContentComponent } from "./side-content/side-content.component";
import { RouterModule } from "@angular/router";
import { MainHeadingComponent } from "./main-heading/main-heading.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideContentComponent,
    MainHeadingComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideContentComponent,
    MainHeadingComponent,
  ],
})
export class LayoutModule {}
