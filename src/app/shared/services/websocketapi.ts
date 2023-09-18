import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebSocketShareService } from './websocketshare.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketAPI {
    //webSocketEndPoint: string = 'http://localhost:8081/ws';
    webSocketEndPoint: string = 'http://3.109.223.32:8081/ws';
    topic: string = "/topic/device-data";
    stompClient: any;
    
    constructor(private websocketShare: WebSocketShareService){
         
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            _this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }	 

    onMessageReceived(message) {    
        this.websocketShare.onNewValueReceive(message.body);
       // this.dashboardComponent.handleMessage(message.body);
    }
}