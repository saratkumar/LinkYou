import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';
import { AppSettings } from '../../appsettings';
import { ResponseResource } from '../models/response.resource';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable()
export class UserService {
    users: User[];

    constructor( private http: HttpClient, private httpClient: HttpClient ) { }

    getUsers() :Observable<User[]>{
        let url = AppSettings.API_ENDPOINT + "/user/getUsers";
        let headerValues = new HttpHeaders( {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN )
        } );
        return this.http.get<User[]>( url, { headers: headerValues } );
    }


    getUserById( userId: number ) {
        let url = AppSettings.API_ENDPOINT + "/user/userById";
        let headerValues = new HttpHeaders(
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN )
            }
        );
        return this.http.post( url, JSON.stringify( userId ), { headers: headerValues } );
    }

    getUserByName( username: string ):Observable<User> {
        console.log( "username is" + username );
        let tokenUrl = AppSettings.API_ENDPOINT + "/user/userName";
        let headers = new HttpHeaders( {
            'Content-Type': 'application/json', 'Authorization': 'Bearer ' +
            localStorage.getItem( AppSettings.TOKEN )
        } );
        return this.http.post<User>( tokenUrl, username, { headers: headers } );
    }

    updateAllUsers( updateAllUserModel: User ) {
        let url = AppSettings.API_ENDPOINT + "/user/updateAll";
        let headerValues = new HttpHeaders( {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN )
        } );
        return this.http.post( url, JSON.stringify( updateAllUserModel ), { headers: headerValues } );
    }

    addUser( newUserModel: User ) {
        let url = AppSettings.API_ENDPOINT + "/user/addUser";
        let headerValues = new HttpHeaders(
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN )
            }
        );
        return this.http.post( url, JSON.stringify( newUserModel ), { headers: headerValues } );
    }

    deleteUserById( userId: number ) {
        let url = AppSettings.API_ENDPOINT + "/user/deleteByUserId";
        let headerValues = new HttpHeaders( {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN )
        } );
        return this.http.post( url, JSON.stringify( userId ), { headers: headerValues } );
    }


    deleteSelected( userIds: number[] ) {
        let url = AppSettings.API_ENDPOINT + "/user/deleteSelected/" + userIds;
        let headerValues = new HttpHeaders( { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN ) } );
        return this.http.delete( url, { headers: headerValues } );
    }

    isMobileAlreadyExists( mobile: string ) {
        let url = AppSettings.API_ENDPOINT + "/user/exists/mobile/" + mobile;
        let headerValues = new HttpHeaders( { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN ) } );
        return this.http.get( url, { headers: headerValues } );
    }

    isEmailAlreadyExists( email: string ) {
        let url = AppSettings.API_ENDPOINT + "/user/exists/email/" + email;
        let headerValues = new HttpHeaders( { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN ) } );
        return this.http.get( url, { headers: headerValues } );
    }
    
    isUserAlreadyExists( userName: string ):Observable<boolean> {
        let url = AppSettings.API_ENDPOINT + "/user/exists/user/" + userName;
        let headerValues = new HttpHeaders( { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN ) } );
        return this.http.get<boolean>( url, { headers: headerValues } );
    }
    
    searchUsersByParam(user:User):Observable<User[]>{
        let url = AppSettings.API_ENDPOINT + "/user/search";
        let headerValues = new HttpHeaders( {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem( AppSettings.TOKEN )
        } );
        return this.http.post<User[]>( url, JSON.stringify( user ), { headers: headerValues } );
    }side
}
