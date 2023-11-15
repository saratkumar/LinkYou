import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from 'src/app/appsettings';

@Injectable()
export class SharedDataService {
    beSubject = new BehaviorSubject(localStorage.getItem(AppSettings.TOKEN) ? true : false);
    
    private dashboardPageSize: any  = 20;
    constructor() {
    }

    setPageSize(dashboardPageSize: any) {
        this.dashboardPageSize = dashboardPageSize;
    }
    

    getDashboardPageSize() {
        return this.dashboardPageSize;
    }

    

}