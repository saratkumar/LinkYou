import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
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
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent, 
    InputComponent,
    LabelComponent,
    EventComponent,
    OtpComponent,
    ToastComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  providers: [NativeGeocoder ]
})
export class SharableModule { }
