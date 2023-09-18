import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings } from "../../appsettings";
import { DashboardBean } from '../models/dashboardbean';
import { Observable } from 'rxjs';

import { ResponseCustom } from '../models/response.custom';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) {

    }

    
}