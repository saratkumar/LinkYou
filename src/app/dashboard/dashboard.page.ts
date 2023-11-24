
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { SharedDataService } from '../shared/services/shared-data.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastComponent } from '../shared/components/toast.component';
// import { NavController, Content, Slides } from 'ionic-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class Dashboard {
  // @ViewChild(Slides) slides: Slides;
  public segment: string = "list";
  public images: any = ['slide 1', 'slide 2', 'slide 3', 'slide 4', 'slide 5'];
  presentingElement: any = null;
  listOfEvents: Array<any> = [];
  interestedEvents: Array<any> = [];
  filteredEvents: Array<any> = [];
  @ViewChild("toast") toast!: ToastComponent;
  constructor(private dashboardService: DashboardService, private sharedDataService: SharedDataService) {
  }
  filterForm: any = new FormGroup({
    donationType: new FormControl(''),
    interestedStatus: new FormControl(''),
  });

  ionViewDidEnter() {
    this.presentingElement = document.querySelector('.ion-page');
    this.dashboardService.listInterests().subscribe((el: any) => {
      this.interestedEvents = el.data;
      this.dashboardService.listEvents().subscribe((el: any) => 
      {
        this.listOfEvents = el.data.map((el: any) => {
          el.interestedStatus = this.interestedEvents.find(ie => ie.donationEvent?.id === el.id)?.["status"];
          return el;
        });;
        this.onFilter();
      }
    );

    });
    
   }

  segmentChanged(ev: any): void {
    this.segment = ev.detail.value;
  }

  onFilter(): void {
    let tmp = this.listOfEvents;
    if(this.filterForm.value.donationType) {
      tmp = tmp.filter(el => el.donationType === this.filterForm.value.donationType);
    }

    if(this.filterForm.value.interestedStatus) {
      tmp = tmp.filter(el => el.interestedStatus === this.filterForm.value.interestedStatus);
    }
    this.filteredEvents = tmp;
  };

  onClear(): void {
    this.filterForm.reset();
    this.onFilter();
  };

  onShowInterest(event: any, status: string): void {
    const payload = {
      donationEvent: {id: event.id},
      status,
    }
    this.dashboardService.showInterest(payload).subscribe(el => {
      this.toast.presentToast("Event status updated successfully");
      event.interestedStatus = status;
    }, err => {
      this.toast.presentToast("Please try again later!");
    })
  };
  

  onSearchValueChange(ev: any): void {
    let tmp = this.listOfEvents;
    if(ev.target.value) {
      tmp = tmp.filter(el => el.name?.toLowerCase().includes(ev.target.value.toLowerCase()));
    }
    this.filteredEvents = tmp;
  }
  


  
}