import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./context/navigation/navigation.component";
import { HeaderComponent } from "./context/header/header.component";
import { FooterComponent } from "./context/footer/footer.component";
import { HomePageComponent } from "./component/home-page/home-page.component";
import { CurrencyPipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
