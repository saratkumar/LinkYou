import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input.component';
import { LabelComponent } from './label.component';
import { EventComponent } from 'src/app/event/event.component';
import { DateTimeComponent } from './datetime.component';
import { OtpComponent } from './otp.component';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ToastComponent } from './toast.component';
@NgModule({
  declarations: [FooterComponent, InputComponent, LabelComponent, EventComponent, DateTimeComponent, OtpComponent, ToastComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent, 
    InputComponent,
    LabelComponent,
    EventComponent,
    OtpComponent,
    ToastComponent,
    ReactiveFormsModule,
    IonicModule,
  ],
  providers: [NativeGeocoder ]
})
export class SharableModule { }
