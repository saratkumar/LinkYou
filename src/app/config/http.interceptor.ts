import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SharedDataService } from "../shared/services/shared-data.service";

@Injectable()
export class HttpReqResInterceptor implements HttpInterceptor {
  constructor(private router: Router, private sharedService: SharedDataService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if(event.status == 401 || event.status === 403) {
              this.router.navigateByUrl("/login");
              this.sharedService.beSubject.next(false);
            }
          }
          return event;
        },
        error: (error) => {
          if(error.status === 401 || error.status === 403) {
            this.router.navigateByUrl("/login");
            this.sharedService.beSubject.next(false);
          }
        //   else if(error.status === 404) {
        //     alert('Page Not Found!')
        //   }
        }
      }));
  }
}
