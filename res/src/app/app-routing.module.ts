import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketSiteComponent } from './basketSiteComponent/basket-site/basket-site.component';
import { MainSiteComponent } from './mainSiteComponent/main-site/main-site.component';
import { OrderSiteComponent } from './orderSiteComponent/order-site/order-site.component';
import { UserSiteComponent } from './userSiteComponent/user-site/user-site.component';

const routes: Routes = [
  {path: "", component: MainSiteComponent},
  {path: "user", component: UserSiteComponent},
  {path: "order", component: OrderSiteComponent},
  {path: "basket", component: BasketSiteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
