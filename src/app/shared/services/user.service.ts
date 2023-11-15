import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';
import { AppSettings } from '../../appsettings';
import { ResponseResource } from '../models/response.resource';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
    users: User[];

    constructor( private http: HttpClient, private httpClient: HttpClient ) { }

    getUser() :Observable<User[]>{
        let url = AppSettings.API_BASE_ENDPOINT + "/user/";
        let headerValues = new HttpHeaders( {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN )
        } );
        return this.http.get<User[]>( url, { headers: headerValues } );
    }

    saveUser(payload: User) :Observable<User[]>{
        let url = AppSettings.API_BASE_ENDPOINT + "/user/";
        let headerValues = new HttpHeaders( {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN )
        } );
        return this.http.post<User[]>( url, payload, { headers: headerValues } );
    }


}
