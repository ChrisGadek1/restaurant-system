import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs'

import { MainSiteComponent } from './mainSiteComponent/main-site/main-site.component';
import { UserSiteComponent } from './userSiteComponent/user-site/user-site.component';
import { OrderSiteComponent } from './orderSiteComponent/order-site/order-site.component';
import { BasketSiteComponent } from './basketSiteComponent/basket-site/basket-site.component';


@NgModule({
  declarations: [
    AppComponent,
    MainSiteComponent,
    UserSiteComponent,
    OrderSiteComponent,
    BasketSiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
