import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-shareourapp',
  templateUrl: './shareourapp.page.html',
  styleUrls: ['./shareourapp.page.scss'],
})
export class ShareourappPage implements OnInit {
  text = 'Hey, Get this app for great saving coupons & offers on couponzcorner!';
  url = 'http://bit.ly/savejiapp';

  constructor(private socialSharing: SocialSharing, private file: File, private _location: Location, private router: Router) {
    //this.shareEmail();
    this.shareAll();
  }

  ngOnInit() {
  }

  async shareTwitter() {
    // Either URL or Image
    this.socialSharing.shareViaTwitter(this.text, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  async shareWhatsApp() {
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  async resolveLocalFile() {
    return this.file.copyFile(`${this.file.applicationDirectory}www/assets/banners/`, 'fashion.jpg', this.file.cacheDirectory, `${new Date().getTime()}.jpg`);
  }

  removeTempFile(name) {
    this.file.removeFile(this.file.cacheDirectory, name);
  }

  async shareEmail() {
    //let file = await this.resolveLocalFile();

    /* this.socialSharing.shareViaEmail(this.text, 'Save more with couponzcorner.com!', ['mirthbees@gmail.com'], null, null, file.nativeURL).then(() => {
       this.removeTempFile(file.name);
     }).catch((e) => {
       // Error!
     });*/

    this.socialSharing.shareViaEmail(this.text, 'Save more with couponzcorner.com!', ['mirthbees@gmail.com'], null, null, null);

  }

  async shareAll() {
    this.socialSharing.share(this.text, 'Save more with couponzcorner.com!', null, this.url);
  }


  async shareFacebook() {
    this.socialSharing.shareViaFacebook(this.text, null);
  }


  goBack() {
    this._location.back();
  }

  navigateToSearchPage() {
    this.router.navigate(['/search']);
  }
}
