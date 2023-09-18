import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Platform } from '@ionic/angular';




@Component({
  selector: 'app-rateourapp',
  templateUrl: './rateourapp.page.html',
  styleUrls: ['./rateourapp.page.scss'],
})
export class RateOurAppPage implements OnInit {



  constructor(public platform: Platform, private appRate: AppRate, private _location: Location, private router: Router) {
    this.rateUsOnPlaystore();
  }

  rateUsOnPlaystore() {

    /* this.appRate.preferences = {
       openStoreInApp:false,
       displayAppName: 'App Rate Demo',
       usesUntilPromp: 5,
       promptAgainForEachNewVersion: true,
       storeAppURL:{
       ios: '< my_app_id >', 
                      android: 'market://details?id=com.couponzcorner'
       },
       customLocale: {
       title: 'Do you enjoy %@?'
       message: 'If you enjoy %@. would you mind talking to rate it?',
       cancelButtonLabel: 'No, Thanks',
       laterButtonLabel: 'Remind Me Later',
       rateButtonLabel: 'Rate It Now'
       },
       callbacks:{
       onRateDialogShow: function(callback) {
       },
       onButtonClicked: function(buttonIndex){
       }
       }
     }
     */
    this.platform.ready().then(
      () => {
        //ios: '<app_id>',
        // windows: 'ms-windows-store://review/?ProductId=<store_id>'
        this.appRate.preferences.storeAppURL = {
          android: 'market://details?id=com.couponzcorner'
        }
        this.appRate.promptForRating(true);
      })

  }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

  navigateToSearchPage() {
    this.router.navigate(['/search']);
  }
}
