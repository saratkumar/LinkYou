import { Component, QueryList, ViewChildren, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController, IonRouterOutlet, MenuController, ModalController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { User } from './shared/models/user';
import { AppSettings } from './appsettings';
import { CookieService } from 'ngx-cookie-service';
import { SharedDataService } from './shared/services/shared-data.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription | undefined;
  private previousAuthState = false;
  loggedUserInfo = new User();
  photoUrl: string = '../../assets/default-avatar.svg';
  appSettings = AppSettings;
  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet> | undefined;
  userLoggedIn: boolean = false;

  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    },

  ];

  constructor( private cookieService: CookieService, private appMinimize: AppMinimize,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router,
    public network: Network,
    public toastController: ToastController,
    public route: ActivatedRoute,
    @Inject(SharedDataService) private sharedService: SharedDataService
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }
  private notificationSetup() {
    // this.fcm.getToken();
    // this.fcm.onNotifications().subscribe(
    //   (msg) => {
    //     if (this.platform.is('ios')) {
    //       this.presentToast(msg.aps.alert);
    //     } else {
    //       this.presentToast(msg.body);
    //     }
    //   });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins['SplashScreen']['hide']();
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();

    });
  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      // close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close side menua
      try {
        const element = await this.menu.getOpen();
        if (element !== null) {
          this.menu.close();
          return;
        }
      } catch (error) { }
      this.routerOutlets?.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === '/home') {
          this.appMinimize.minimize();
        } else if (this.router.url === '/stores') {
          this.router.navigate(['/home']);
        }
        else if (this.router.url === '/category') {
          this.router.navigate(['/home']);
        } else if (this.router.url === '/banks') {
          this.router.navigate(['/home']);
        } else if (this.router.url === '/brands') {
          this.router.navigate(['/home']);
        } else if (this.router.url === '/offers') {
          this.router.navigate(['/home']);
        } else if (this.router.url === '/shareourapp') {
          this.router.navigate(['/home']);
        }
      });
    });
  }

  private async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
    this.sharedService.beSubject.subscribe((data: any) => {
      this.userLoggedIn = data;
    })


    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );

  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  logout(){
    console.log("perform logout here in app component!");
    localStorage.setItem(AppSettings.TOKEN, "");
    localStorage.setItem(AppSettings.CURRENT_USER_NAME, '');
    localStorage.setItem('isLoggedin', 'false');
    this.cookieService.delete(AppSettings.TOKEN);
    this.cookieService.delete(AppSettings.CURRENT_USER_NAME);
    this.sharedService.beSubject.next(false);
//    alert("You just logged out.");
    this.router.navigate(['','login']);
  }
}
