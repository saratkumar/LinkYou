import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/LoginComponent';
import { UserComponent } from './user/user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharableModule } from './shared/components/sharable.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './shared/services/user.service';
import { SharedDataService } from './shared/services/shared-data.service';
import { DashboardService } from './shared/services/dashboard.service';
import { LoginService } from './shared/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NetworkProviderService } from './shared/services/networkprovider.service';
import { NetworkService } from './shared/services/network.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './dashboard/dashboard.module';
import { HttpReqResInterceptor } from './config/http.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4300', 'localhost:8100'],
        disallowedRoutes: ['localhost:4300/auth/', 'localhost:8100/auth/']
      }
    }),
    SharableModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser, 
    NetworkService, 
    NetworkProviderService,
    Network,
    AppMinimize,
    CookieService,
    LoginService,
    DashboardService,
    SharedDataService,
    UserService,
    { 
      provide: HTTP_INTERCEPTORS, useClass: HttpReqResInterceptor, multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
