import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../appsettings';
import { Password } from "../models/password";
import { environment } from "../../../environments/environment";
import { EmailValidator } from "@angular/forms";
import { UserRequest } from "../models/UserRequest.bean";

@Injectable()
export class LoginService {
  token: string;

  constructor(private route: Router, private http: HttpClient) { }

  login(userRequest: UserRequest){
    let loginUrl = AppSettings.USER_LOGIN_API;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(loginUrl, JSON.stringify(userRequest), { headers: headers });
  }

  sendCredential(model) {
    let tokenUrl1 = AppSettings.API_ENDPOINT + "/user/login";
    let headers1 = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(tokenUrl1, JSON.stringify(model), { headers: headers1 });
  }

  sendToken(token) {
    let tokenUrl2 = AppSettings.API_ENDPOINT + "/user/getUsers";
    let getHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(tokenUrl2, { headers: getHeaders })
  }

  logout() {
    localStorage.setItem(AppSettings.TOKEN, "");
    localStorage.setItem(AppSettings.CURRENT_USER_NAME, '');
    localStorage.setItem('isLoggedin', 'false');
    //alert("You just logged out.");
  }

  checkLogin() {
    if (localStorage.getItem(AppSettings.CURRENT_USER_NAME) != null && localStorage.getItem(AppSettings.CURRENT_USER_NAME) != '' && localStorage.getItem(AppSettings.TOKEN) != null && localStorage.getItem(AppSettings.TOKEN) != '') {
      this.route.navigate(['/home']);
      localStorage.setItem('isLoggedin', 'true');
    }
  }


  changePassword(passwordBean: Password) {
    let passwordChangeUrl = AppSettings.API_ENDPOINT + "/user/changepassword";
    let headers1 = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem(AppSettings.TOKEN) });
    return this.http.post(passwordChangeUrl, JSON.stringify(passwordBean), { headers: headers1 });
  }

}
