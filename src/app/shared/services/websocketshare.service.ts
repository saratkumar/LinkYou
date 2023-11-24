import { JsonpClientBackend } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";


@Injectable()
export class WebSocketShareService implements OnDestroy {

    private deviceDataSubject = new BehaviorSubject<string>(undefined);

    constructor() { }
    ngOnDestroy(): void {
        this.deviceDataSubject.unsubscribe();
    }
    
    onNewValueReceive(msg: string) {      
        this.deviceDataSubject.next(msg);
    }

    getNewValue(): Observable<string> {        
        return this.deviceDataSubject.asObservable();
    }
}