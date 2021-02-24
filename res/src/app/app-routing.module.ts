import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketSiteComponent } from './basketSiteComponent/basket-site/basket-site.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { NotloginGuard } from './guards/notlogin.guard';
import { LoginComponent } from './loginComponent/login/login.component';
import { MainSiteComponent } from './mainSiteComponent/main-site/main-site.component';
import { OrderSiteComponent } from './orderSiteComponent/order-site/order-site.component';
import { RegisterComponent } from './registerComponent/register/register.component';
import { UserSiteComponent } from './userSiteComponent/user-site/user-site.component';

const routes: Routes = [
  {path: "", component: MainSiteComponent},
  {path: "user", component: UserSiteComponent, canActivate: [NotloginGuard]},
  {path: "order", component: OrderSiteComponent},
  {path: "basket", component: BasketSiteComponent, canActivate: [NotloginGuard]},
  {path: "login", component: LoginComponent, canActivate: [LoginGuardGuard]},
  {path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
