import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RateOurAppPage } from './rateourapp.page';
import { AppRate } from '@ionic-native/app-rate/ngx';


const routes: Routes = [
  {
    path: '',
    component: RateOurAppPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)

  ],
  declarations: [RateOurAppPage],
  providers: [AppRate]
})
export class RateOurAppPageModule { }
