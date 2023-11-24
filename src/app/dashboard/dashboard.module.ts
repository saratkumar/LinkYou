import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { Dashboard } from './dashboard.page';
import { SharableModule } from '../shared/components/sharable.module';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
// import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
// import { LoginComponent } from '../login/LoginComponent';
// import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../shared/services/login.service';
import { DashboardService } from '../shared/services/dashboard.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationComponent } from '../shared/components/location/location.component';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    // ContentLoaderModule,
   
    RouterModule.forChild([
      {
        path: '',
        component: Dashboard
      }
    ]),
    SharableModule,
  ],
  declarations: [Dashboard, LocationComponent],
  providers: [Geolocation,BrowserTab,CookieService,LoginService, DashboardService,]
})
export class DashboardModule { }
