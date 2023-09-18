import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


import { LoginService } from './../shared/services/login.service';
import { AppSettings } from "../appsettings";
// import { ReCaptchaV3Service } from 'ngx-captcha';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
 import { UserRequest } from '../shared/models/UserRequest.bean';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  protected aFormGroup: FormGroup;
  captchaPass: boolean = false;
  adminLoginHuman: boolean = false;
  isCredentialCorrect: boolean = true;
  loginRememberMe: boolean = false;
  userRequest: UserRequest = new UserRequest();
  responseMsg: string = '';


  // model = { 'username': '', 'password': '', 'rememberMe': '' };
  private currentUserName;

  constructor(private jwtHelperService: JwtHelperService, private cookieService: CookieService, private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.currentUserName = localStorage.getItem(AppSettings.CURRENT_USER_NAME);

  }



  ngOnInit() {
console.log("token in ngoninit in twad:: "+localStorage.getItem(AppSettings.TOKEN));
console.log("Naveen: "+this.cookieService.get(AppSettings.TOKEN));
    var decodedToken = this.jwtHelperService.decodeToken(localStorage.getItem(AppSettings.TOKEN));

    if (decodedToken && null != decodedToken && null != decodedToken.exp && this.isTokenValidStill(decodedToken.exp)) {
      this.aFormGroup = this.formBuilder.group({
        recaptcha: ['', Validators.required]
      });


      this.router.navigate(['/dashboard']);
    } else {
      this.onLogout();
      this.router.navigate(['/login']);
    }
  }

  onLogout() {    
    /*localStorage.removeItem('isLoggedin');
    localStorage.setItem(AppSettings.TOKEN, "");
    localStorage.setItem(AppSettings.CURRENT_USER_NAME, '');
    localStorage.removeItem(AppSettings.TOKEN);
    localStorage.removeItem(AppSettings.CURRENT_USER_NAME);
    this.cookieService.delete(AppSettings.TOKEN);
    this.cookieService.delete(AppSettings.CURRENT_USER_NAME);*/
  }


  handleSuccess(event: any) {

  }

  onSubmit() {
    console.log("submit from the home page now" + JSON.stringify(this.userRequest));

    /*if (this.loginRememberMe) {
      this.model.rememberMe = 'Y';
    } else {
      this.model.rememberMe = 'N';
    }*/

    this.loginService.login(this.userRequest).subscribe((data) => {
      if (data && data["message"] && data["message"].includes("Invalid login")) {
        this.responseMsg = "Invalid username/password";
      } else {
        this.responseMsg = "";
        this.cookieService.set(AppSettings.TOKEN, data["data"]["token"], 6.9472);
        this.cookieService.set(AppSettings.CURRENT_USER_NAME, data["data"]["email"], 6.9472);
        localStorage.setItem(AppSettings.TOKEN, data["data"]["token"]);
        localStorage.setItem(AppSettings.CURRENT_USER_NAME,  data["data"]["email"]);
        console.log("token in submit:: "+localStorage.getItem(AppSettings.TOKEN));
        this.router.navigate(['/dashboard']);
        //this.router.navigate(['/']);
        this.userRequest = new UserRequest();
      }
    });

    // if remember me option is clicked then create the token with 24 hour validity
    /*  this.loginService.loginWithGoogleFirebase(this.model.username, this.model.password).subscribe(
        (data) => {
  
          this.googleLoginResponse = data;
          console.log("response from the sendcredentials =>" + this.googleLoginResponse.idToken);
  
          localStorage.setItem(AppSettings.TOKEN, this.googleLoginResponse.idToken);
          console.log("setting token in local storage completed");
  
          if (this.model.rememberMe === 'N') {
            //this.cookieService.set(AppSettings.TOKEN, JSON.parse(JSON.stringify(data)), 0.0416);
            // this.cookieService.set(AppSettings.CURRENT_USER_NAME, this.model.username, 0.0416);
          } else {
            // 0.0416 is roughly calculated per hour, so 167*0.0416 = 6.9472, 168 hour per week for backend timezone 1 hour minues and calculated for the token validity
            this.cookieService.set(AppSettings.TOKEN, this.googleLoginResponse.idToken, 6.9472);
            this.cookieService.set(AppSettings.CURRENT_USER_NAME, this.googleLoginResponse.localId, 6.9472);
          }
          this.blockUI.stop();
          this.router.navigate(['/']);
        },
        error => {
          this.blockUI.stop();
          this.isCredentialCorrect = false;
        }
      );
  */
  }

  adminLoginResolved(captchaResponse: string) {
    this.adminLoginHuman = true;
    //  console.log(`Resolved captcha with response ${captchaResponse}:`);
  }


  public isTokenValidStill(authTime: number): boolean {
    var tokenAuthenticatedTime = new Date(0);
    tokenAuthenticatedTime.setUTCSeconds(authTime);
    var endDate = new Date();
    var seconds = (endDate.getTime() - tokenAuthenticatedTime.getTime()) / 1000;
    if (seconds <= 900) {
      return true;
    }
    return false;
  }
}