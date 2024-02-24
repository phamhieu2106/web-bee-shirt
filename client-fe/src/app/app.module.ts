import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './context/navigation/navigation.component';
import { HeaderComponent } from './context/header/header.component';
import { FooterComponent } from './context/footer/footer.component';
import { HomePageComponent } from './component/home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, NavigationComponent, HeaderComponent, FooterComponent, HomePageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
