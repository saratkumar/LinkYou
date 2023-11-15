import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-custom-datetime',
  template: `
    <!-- <ion-label> Date / Time</ion-label> -->
    <ion-datetime-button datetime="datetime" class="datetime"></ion-datetime-button>

<ion-modal [keepContentsMounted]="true" #datemodal>
  <ng-template>
    <ion-datetime id="datetime" [(ngModel)]="context" (ngModelChange)="onModelChange()"></ion-datetime>
    <ion-button (click)="datemodal.dismiss(); value.emit(context);">Apply</ion-button>
  </ng-template>
</ion-modal>
 `,
  styles:[ 
    `.datetime {
      justify-content: left !important;
      /* margin-left: -10px; */
    }
    `
  ]  
  ,
})
export class DateTimeComponent {

    @Output() value: EventEmitter<any> = new EventEmitter();
    context: any;
    constructor() {
      this.value.emit(this.context);
    }

    onModelChange() {
      this.value.emit(this.context)
    }

}
