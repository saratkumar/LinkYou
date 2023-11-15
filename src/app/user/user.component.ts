import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { AppSettings } from '../appsettings';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared/services/shared-data.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { ToastComponent } from '../shared/components/toast.component';
@Component({
  selector: 'app-user',
  templateUrl: "user.component.html",
  styleUrls: ['user.component.scss'],
})
export class UserComponent implements OnInit {

  onProfileEdit: boolean = false;
  userInfo: User = new User();
  @ViewChild("toast") toast: ToastComponent;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private sharedService: SharedDataService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((res: any) => {
      this.userInfo = res.data;
    }, (error) => {
      console.log(error);
    });
  }

    

  logout(): void {
    console.log("perform logout here in app component!");
    localStorage.setItem(AppSettings.TOKEN, "");
    localStorage.setItem(AppSettings.CURRENT_USER_NAME, '');
    localStorage.setItem('isLoggedin', "false");
    this.sharedService.beSubject.next(false);
    this.cookieService.delete(AppSettings.TOKEN);
    this.cookieService.delete(AppSettings.CURRENT_USER_NAME);
//    alert("You just logged out.");
    this.router.navigate(['','login']);
  }

  onUserSave() {
    this.userService.saveUser(this.userInfo).subscribe(el => {
      this.toast.presentToast("User details updated successfully");
    });
  }

}
