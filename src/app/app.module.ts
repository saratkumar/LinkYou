import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerService } from './shared/services/banner.service';
import { NetworkService } from './shared/services/network.service';
import { NetworkProviderService } from './shared/services/networkprovider.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SharableModule } from './shared/components/sharable.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './shared/services/login.service';
import { LoginComponent } from './login/LoginComponent';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WebSocketShareService } from './shared/services/websocketshare.service';
import { WebSocketAPI } from './shared/services/websocketapi';
import { DashboardService } from './shared/services/dashboard.service';
import { SharedDataService } from './shared/services/shared-data.service';
export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [AppComponent, LoginComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4300', 'localhost:8100'],
        disallowedRoutes:  ['localhost:4300/auth/', , 'localhost:8100/auth/']
      }
    }),
    SharableModule,
    FormsModule, 
    ReactiveFormsModule, NoopAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, BannerService,
    InAppBrowser, NetworkService, NetworkProviderService, Network,
    Facebook,
    TwitterConnect,
    AppMinimize,
    FCM,
    SocialSharing,
    CookieService,
    LoginService,
    WebSocketShareService,
    WebSocketAPI,
    DashboardService,
    SharedDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
