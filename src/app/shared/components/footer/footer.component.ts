import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { OverlayEventDetail } from '@ionic/core/components';
import { EventComponent } from 'src/app/event/event.component';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent {

  text = 'Hey, Download couponzcorner app for great saving coupons & offers & more!';
  url = 'http://bit.ly/savejiapp';
  @ViewChild(EventComponent) eventComponent!: EventComponent;

  constructor() {}

  openPost() {
    this.eventComponent.setNewModal(true);
  }

}