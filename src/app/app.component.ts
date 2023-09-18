import { Component, QueryList, ViewChildren, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController, IonRouterOutlet, MenuController, ModalController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { NetworkProviderService } from './shared/services/networkprovider.service';
import { Capacitor, Plugins } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { User } from './shared/models/user';
import { AppSettings } from './appsettings';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previousAuthState = false;
  loggedUserInfo = new User();
  photoUrl: string = '../../assets/default-avatar.svg';

  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
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
    private toastCtrl: ToastController,
    // public events: Events,
    public network: Network,
    public networkProvider: NetworkProviderService,
    public toastController: ToastController,
    public route: ActivatedRoute
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // added the below snippets to check the internet connectivity
      // Offline event
      // this.events.subscribe('network:offline', () => {
      //   alert('network:offline ==> ' + this.network.type);
      // });

      // // Online event
      // this.events.subscribe('network:online', () => {
      //   alert('network:online ==> ' + this.network.type);
      // });
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
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
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

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
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
//    alert("You just logged out.");
    this.router.navigate(['','login']);
  }
}
