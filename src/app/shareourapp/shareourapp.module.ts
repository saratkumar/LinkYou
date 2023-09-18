import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { ShareourappPage } from './shareourapp.page';

const routes: Routes = [
  {
    path: '',
    component: ShareourappPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)

  ],
  declarations: [ShareourappPage],
  providers: [File,
    SocialSharing]
})
export class ShareourappPageModule { }
