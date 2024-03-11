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
import { TopbarComponent } from './context/topbar/topbar.component';
import { PhieuGiamGiaComponent } from './context/phieu-giam-gia/phieu-giam-gia.component';
import { HeaderBottomComponent } from './context/header-bottom/header-bottom.component';
import { ProductComponent } from './context/product/product.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    TopbarComponent,
    PhieuGiamGiaComponent,
    HeaderBottomComponent,
    ProductComponent,
    
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
