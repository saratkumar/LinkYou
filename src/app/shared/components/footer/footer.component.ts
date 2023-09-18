import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent {

  text = 'Hey, Download couponzcorner app for great saving coupons & offers & more!';
  url = 'http://bit.ly/savejiapp';

  constructor(private socialSharing: SocialSharing) {

  }

  async shareWhatsApp() {
    this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
    }).catch((e) => {
    });
  }

  async shareTwitter() {
    this.socialSharing.shareViaTwitter(this.text, null, this.url).then(() => {
    }).catch((e) => {
    });
  }

  async shareFacebook() {
    this.socialSharing.shareViaFacebook(this.text, null);
  }

  async shareAll() {
    this.socialSharing.share(this.text, null, null, this.url);
  }

}