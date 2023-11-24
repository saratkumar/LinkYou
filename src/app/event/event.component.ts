import { Component, ElementRef, ViewChild, ViewChildren } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IonModal } from "@ionic/angular";
import { OverlayEventDetail } from '@ionic/core/components';
import { DashboardService } from "../shared/services/dashboard.service";
import { Router } from "@angular/router";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { ToastComponent } from "../shared/components/toast.component";

@Component({
    selector: 'app-event',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.scss'],
})
export class EventComponent {
    @ViewChild(IonModal) modal: IonModal | undefined;
    @ViewChild("fileUpload") fileUpload: ElementRef | undefined;
    @ViewChild("toast") toast: ToastComponent | any;
    

    message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
    name!: string ;
    isModalOpen: boolean = false;
    images: Array<any> = [];
    createForm: any = new FormGroup({
        name: new FormControl('', Validators.required),
        donationType: new FormControl('', Validators.required),
        // donationPostedDateTime: new FormControl(new Date().toLocaleString(), Validators.required),
        estimatedQuantity: new FormControl('', Validators.required),
        expiryDate: new FormControl(new Date().toISOString(), Validators.required),
        fullAddress: new FormControl('', Validators.required),
        additionalNote: new FormControl('', Validators.required),
      });

    constructor(private dashboardService: DashboardService, private router: Router, private nativeGeocoder: NativeGeocoder) {
        
    }
    setNewModal(flag: boolean): void {
        this.isModalOpen = flag;
    };

    setDateTimeValue(x: any) {
        this.createForm.controls['expiryDate'].setValue(new Date(x).toISOString());
    };

    onfileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (event:any) => {
            this.images.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[0]);  // to trigger onload
        }
        
        let fileList: FileList = event.target.files;  
        let file: File = fileList[0];
        console.log(file);
      }

    onImageClick() {
        this.fileUpload?.nativeElement.click();
    }  

    onCategoryChange() {
        if(this.createForm.value.donationType === "BLOOD") {
            !this.createForm.value.estimatedQuantity && this.createForm.controls['estimatedQuantity'].setValue(1);
        }
    }

    onImageRemove(index: any) {
        this.images.splice(index, 1);
    }

    onSubmit() {
        if(this.createForm.status === "VALID") {
            const payload: any  = {
                name: this.createForm.value.name,
                donationType: this.createForm.value.donationType,
                estimatedQuantity: this.createForm.value.estimatedQuantity,
                donationPostedDateTime: new Date().toISOString(),
                expiryDate: this.createForm.value.expiryDate,
                fullAddress: this.createForm.value.fullAddress,
                additionalNote: this.createForm.value.additionalNote,
                pincode: 521221,
                estimatedUnits: 0,
                status: "POSTED",
                platformFeeCollected: false,
            }

            this.nativeGeocoder.forwardGeocode("Singapore 521221").then(result => {
                payload.latitude = result[0]?.latitude;
                payload.longitude = result[1]?.longitude;
                this.dashboardService.addEvent(payload).subscribe(()=> {
                    this.toast.presentToast("Event published successfully");
                    this.router.navigateByUrl("/dashboard");
                }, (error) => {
                    this.toast.presentToast("Please try again later!");
                })
            }).catch(err => {
                payload.latitude = 1.232321212;
                payload.longitude = 1.23123123;
                this.dashboardService.addEvent(payload).subscribe(()=> {
                    this.router.navigateByUrl("/dashboard");
                }, (error) => {
                    this.toast.presentToast("Please try again later!");
                })
            });

            
        }
    }

}