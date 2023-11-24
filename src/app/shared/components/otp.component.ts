import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-otp',
    template: `
  <ion-row >
    <ion-col size="2">
     <ion-input class="x" #otp1 required="true" maxLength="1" [(ngModel)]="OTP[0]" (keyup)="otpController($event,otp2, null)">
     </ion-input>
     </ion-col>
     <ion-col size="2">
     <ion-input class="x" #otp2 required="true" maxLength="1" [(ngModel)]="OTP[1]" (keyup)="otpController($event,otp3, otp1)">
     </ion-input>
     </ion-col>
     <ion-col size="2">
     <ion-input class="x" #otp3 required="true" maxLength="1" [(ngModel)]="OTP[2]"  (keyup)="otpController($event, otp4, otp2)">
     </ion-input>
     </ion-col>
     <ion-col size="2">
     <ion-input class="x" #otp4 required="true" maxLength="1" [(ngModel)]="OTP[3]"  (keyup)="otpController($event, otp5, otp3)">
    </ion-input>
    </ion-col>
    <ion-col size="2">
    <ion-input class="x" #otp5  required="true" maxLength="1" [(ngModel)]="OTP[4]" (keyup)="otpController($event, otp6, otp4)">
    </ion-input>
    </ion-col>
    <ion-col size="2">
    <ion-input class="x" #otp6  required="true" maxLength="1" [(ngModel)]="OTP[5]" (keyup)="otpController($event, null, null)">
    </ion-input>

    </ion-col>
  </ion-row>`,
    styleUrls: ['../styles/common.styles.scss'],
})
export class OtpComponent {

    inputValue: any = "";
    OTP: any = {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""};
    @Output('context') sendToParent = new EventEmitter();

    constructor() { }



    otpController(event: any, next: any, prev: any) {
        if(next) {
            next.setFocus();
        }
        
        // if (event.target.value.length < 1 && prev) {
        //     prev.setFocus()
        // }
        // else if (next && event.target.value.length > 0) {
        //     next.setFocus();
        // }
        const val = Object.values(this.OTP).join("");
        this.sendToParent.emit(val);
       
    }

}
