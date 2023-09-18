
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { SharedDataService } from '../shared/services/shared-data.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class Dashboard implements OnInit, OnDestroy {
  
  constructor(private dashboardService: DashboardService, private sharedDataService: SharedDataService) {
  }
  ngOnDestroy(): void {
        
  }

  ngOnInit(): void {
  }

  

  


  
}