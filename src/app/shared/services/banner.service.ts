import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from "../../appsettings";
import { catchError, map, tap, filter } from 'rxjs/operators';
import { ResponseCustom } from '../models/response.custom';
import { Observable, of, Subject } from 'rxjs';
import { BannerBean } from '../models/bannerbean';

@Injectable()
export class BannerService {
  private _mobileAppBanners = "assets/jsons/banners.json";

  responseCustom: ResponseCustom = new ResponseCustom();
  banners: BannerBean[] = [];
  constructor(private http: HttpClient) {
  }

  getBanners(): Observable<ResponseCustom> {
    if (AppSettings.env === 'SERVER') {
      //let url = AppSettings.SERVER_DOMAIN + "/couponzcorner/api/mobileapp/banners";
      // return this.http.get<ResponseCustom>(url);
      return this.http.get<ResponseCustom>(this._mobileAppBanners);      
    } else if (AppSettings.env === 'LOCAL') {
      return this.http.get<ResponseCustom>(this._mobileAppBanners);
    }

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}