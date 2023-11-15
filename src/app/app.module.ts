import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { UserComponent } from './user/user.component';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { UserService } from './shared/services/user.service';
import { HttpReqResInterceptor } from './config/http.interceptor';
export function tokenGetter() {
  return localStorage.getItem('token');
}
const firebaseConfig = {
  apiKey: "AIzaSyAnfwQHyDyzV6i92k3U-o_rJQZ8RKleCz4",
  authDomain: "lifelinker-1199a.firebaseapp.com",
  projectId: "lifelinker-1199a",
  storageBucket: "lifelinker-1199a.appspot.com",
  messagingSenderId: "815102860462",
  appId: "1:815102860462:web:8d3e83ce9812bfd09f613f",
  measurementId: "G-LCNH5X4YJ2"
};
@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent],
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
    ReactiveFormsModule,
    NoopAnimationsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
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
    SharedDataService,
    Firebase,
    UserService,
    { 
      provide: HTTP_INTERCEPTORS, useClass: HttpReqResInterceptor, multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
