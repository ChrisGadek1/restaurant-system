import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs'
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MainSiteComponent } from './mainSiteComponent/main-site/main-site.component';
import { UserSiteComponent } from './userSiteComponent/user-site/user-site.component';
import { OrderSiteComponent } from './orderSiteComponent/order-site/order-site.component';
import { BasketSiteComponent } from './basketSiteComponent/basket-site/basket-site.component';

import { AgmCoreModule } from '@agm/core';
import { DishComponent } from './dishComponent/dish/dish.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './loginComponent/login/login.component';
import { RegisterComponent } from './registerComponent/register/register.component';
import { DialogComponent } from './registerComponent/dialogComponent/dialog/dialog.component';
import { LoginFailedComponent } from './loginComponent/loginFailedDialog/login-failed/login-failed.component';
import { AuthService } from './services/auth.service';
import { UserDataComponent } from './userDataComponent/user-data/user-data.component';
import { ServerDataService } from './services/server-data.service';
import { BasketElementComponent } from './basketElementComponent/basket-element/basket-element.component';

@NgModule({
  declarations: [
    AppComponent,
    MainSiteComponent,
    UserSiteComponent,
    OrderSiteComponent,
    BasketSiteComponent,
    DishComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    LoginFailedComponent,
    UserDataComponent,
    BasketElementComponent
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
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbJbL-lIAPAe59YI7pFUp2Wz0nqbSbyJM'
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    }),
    MatSelectModule,
    MatDividerModule,
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, ServerDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
