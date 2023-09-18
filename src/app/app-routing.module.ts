import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/LoginComponent';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)
  },
  { path: 'shareourapp', loadChildren: () => import('./shareourapp/shareourapp.module').then(x => x.ShareourappPageModule)},
  { path: 'rateourapp', loadChildren: () => import('./rateourapp/rateourapp.module').then(x => x.RateOurAppPageModule)},
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
