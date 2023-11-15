import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Animation, AnimationController } from '@ionic/angular';

import { LoginService } from './../shared/services/login.service';
import { AppSettings } from "../appsettings";
// import { ReCaptchaV3Service } from 'ngx-captcha';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRequest } from '../shared/models/UserRequest.bean';
import { ERROR_MSG } from '../shared/constants/error.constant';
import { SharedDataService } from '../shared/services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared/styles/common.styles.scss']
})
export class LoginComponent implements OnInit {
 
  protected aFormGroup: FormGroup;
  captchaPass: boolean = false;
  adminLoginHuman: boolean = false;
  isCredentialCorrect: boolean = true;
  loginRememberMe: boolean = false;
  userRequest: UserRequest = new UserRequest();
  responseMsg: string = '';
  showPin: boolean = false;
  showSignupPage: boolean = false;
  confirmPasswordError: boolean = false;
  formDetails: any = {password: "", confirmPassword: "", otp: ""};
  isInvalidOtp: boolean = false;
  showExisitingUserPassword: boolean = false;

  // model = { 'username': '', 'password': '', 'rememberMe': '' };
  private currentUserName;

  constructor(
    private jwtHelperService: JwtHelperService, 
    private cookieService: CookieService, 
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private animationCtrl: AnimationController,
    private sharedService: SharedDataService) {
    this.currentUserName = localStorage.getItem(AppSettings.CURRENT_USER_NAME);

  }



  ngOnInit() {
    // console.log("token in ngoninit in twad:: "+localStorage.getItem(AppSettings.TOKEN));
    // console.log("Naveen: "+this.cookieService.get(AppSettings.TOKEN));
    // var decodedToken = this.jwtHelperService.decodeToken(localStorage.getItem(AppSettings.TOKEN));

    // if (decodedToken && null != decodedToken && null != decodedToken.exp && this.isTokenValidStill(decodedToken.exp)) {
    //   this.aFormGroup = this.formBuilder.group({
    //     recaptcha: ['', Validators.required]
    //   });


    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.onLogout();
    //   this.router.navigate(['/login']);
    // }
    this.sharedService.beSubject.next(false);

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

  onSubmit(type?) {
    this.isInvalidOtp = false;
    this.confirmPasswordError = false;
    this.responseMsg = "";
    if(type) {
      if(this.formDetails.password !== this.formDetails.confirmPassword) {
        this.confirmPasswordError = true;
        return;
      } else {
        this.userRequest.password = this.formDetails.password;
      }
    }
    console.log("submit from the home page now" + JSON.stringify(this.userRequest));

    if(type) {
      this.loginService.signUp(this.userRequest, 123456).subscribe((data) => {
        if (data && data["message"] && data["message"].includes("Invalid login")) {
          this.responseMsg = "Invalid username/password";
        } else {
          this.responseMsg = "";
          this.cookieService.set(AppSettings.TOKEN, data["data"], 6.9472);
          this.cookieService.set(AppSettings.CURRENT_USER_NAME, data["data"]["email"], 6.9472);
          localStorage.setItem(AppSettings.TOKEN, data["data"]);
          localStorage.setItem(AppSettings.CURRENT_USER_NAME,  data["data"]["email"]);
          console.log("token in submit:: "+localStorage.getItem(AppSettings.TOKEN));
          this.showSignupPage = false;
          this.sharedService.beSubject.next(true);
          this.router.navigate(['/dashboard']);
          //this.router.navigate(['/']);
          this.userRequest = new UserRequest();
        }
      }, (err) => {
        if(err?.error?.error === ERROR_MSG.INVALID_OTP) {
          this.isInvalidOtp = true;
        }
      });
    } else {
      this.userRequest.password = this.userRequest.password ? this.userRequest.password : "";
      this.loginService.login(this.userRequest).subscribe((data) => {
        if (data && data["message"] && data["message"].includes("Invalid login")) {
          this.responseMsg = "Invalid username/password";
        } else {
          this.responseMsg = "";
          this.cookieService.set(AppSettings.TOKEN, data["data"], 6.9472);
          this.cookieService.set(AppSettings.CURRENT_USER_NAME, data["data"]["email"], 6.9472);
          localStorage.setItem(AppSettings.TOKEN, data["data"]);
          localStorage.setItem(AppSettings.CURRENT_USER_NAME,  data["data"]["email"]);
          console.log("token in submit:: "+localStorage.getItem(AppSettings.TOKEN));
          this.userRequest = new UserRequest();
          this.sharedService.beSubject.next(true);
          this.router.navigate(['/dashboard']);

          this.showSignupPage = false;
          //this.router.navigate(['/']);
          
        }
      }, (err) => {
        if(err?.error?.error === ERROR_MSG.USER_NOT_FOUND) {
          this.responseMsg = "Invalid username/password";
        } else {
          if(this.showExisitingUserPassword) this.responseMsg = err?.error?.error; 
          else this.showExisitingUserPassword = !this.showExisitingUserPassword
        }
      });
    }

    


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

  onValidateLogin(): void {
    // this.showPin = !this.showPin

  };
}