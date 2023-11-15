import { Injectable, inject } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
// import { AngularFirestore } from 'angularfire2/firestore';
import { Firestore, collectionData, collection, doc, setDoc } from '@angular/fire/firestore';


@Injectable()
export class FcmService {
  firestore: Firestore = inject(Firestore);
  constructor(private firebase: Firebase,
              private afs: Firestore,
              private platform: Platform) {}

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = collection(this.firestore, 'devices');
    const docRef = doc(this.firestore, token);
    const data = {
      token,
      userId: 'testUserId'
    };
    // setDoc(docRef, data);
    return setDoc(docRef, data);
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}