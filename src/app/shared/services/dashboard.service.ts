import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings } from "../../appsettings";


@Injectable()
export class DashboardService {
    headerValues = new HttpHeaders(
        {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem(AppSettings.TOKEN)
        }
    );
    constructor(private http: HttpClient) {

    }

    addEvent( payload: any ) {
        let url = AppSettings.API_BASE_ENDPOINT + "/donation-event/create";
        
        return this.http.post( url, JSON.stringify( payload ), { headers: this.headerValues } );
    }

    listEvents() {
        let url = AppSettings.API_BASE_ENDPOINT + "/donation-event/list";
        return this.http.get( url, { headers: this.headerValues } );
    }

    listInterests() {
        let url = AppSettings.API_BASE_ENDPOINT + "/interested-event/";
        return this.http.get( url, { headers: this.headerValues } );
    }

    showInterest( payload: any ) {
        let url = AppSettings.API_BASE_ENDPOINT + "/interested-event/";
        return this.http.post( url, JSON.stringify( payload ), { headers: this.headerValues } );
    }

    
}