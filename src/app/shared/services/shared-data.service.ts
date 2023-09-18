import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {

    
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