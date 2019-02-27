import { Injectable } from '@angular/core';
import { InjectableRxStompConfig, RxStompService } from '@stomp/ng2-stompjs';
import { Message,FrameImpl, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { NotificationMessagModel } from '../model/message-model';
import { Guid } from '../utils/guid';

export const clientSessionGuid:Guid = Guid.create();

export const myRxStompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: 'ws://localhost:15674/ws',

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
    clientSessionId:clientSessionGuid.toJSON()
  },

  disconnectHeaders:{
    clientSessionId:clientSessionGuid.toJSON()
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 500,
  

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
  
  
};


@Injectable({
  providedIn: 'root'
})
export class PmNotificationService {

  messageObservable:Subject<NotificationMessagModel>;

  constructor(private rxStompService: RxStompService) {
  
    this.messageObservable=new Subject<NotificationMessagModel>();
    // this.rxStompService.stompClient.beforeConnect=()=>{
    //   this.rxStompService.stompClient.connectHeaders
    // };
    // this.rxStompService.watch("test",{"ack":"auto","id:":"sub-0","Header1":"Header1Vaue"}).subscribe(x=>{
    //   console.log("Received message from Subscribe ->" + JSON.stringify(x));
    //   this.messageObservable.next(x);
    // });

    //this.rxStompService.activate();

    
      this.rxStompService.watch("/queue/test").subscribe(x=>{
        console.log("Received message from Subscribe ->" + JSON.stringify(x));
        
        let frame=<IMessage>x;
        //let a=<NotificationMessagModel>x.message;
let b=<NotificationMessagModel><unknown>frame.body;
        this.messageObservable.next(b);
      });

    // this.rxStompService.unhandledMessage$.subscribe(x=>{
    //   console.log("connected");
    // });

    
    // this.rxStompService.connected$.subscribe(x=>{
    //   //console.log("connected");

    //   this.rxStompService.watch("/test").subscribe(x=>{
    //     console.log("Received message from Subscribe ->" + JSON.stringify(x));
    //     this.messageObservable.next(x);
    //   });

    // });
    // this.rxStompService.stompErrors$.subscribe(x=>{
    //   console.log("stomp error:" + x.toString);
    // });
    // this.rxStompService.unhandledReceipts$.subscribe(x=>{
    //   console.log("unhandledReceipts error:" + x.toString);
    // });

    // this.rxStompService.stompClient.webSocket.onmessage=evt =>{

    //   console.log("Event Data Start");
    //   console.log(evt);
    //   console.log("Event Data End");
    // };
    
  }

  public WhenEvents(): Observable<NotificationMessagModel> {

    

    return this.messageObservable.pipe(map(x=>{
      var message:NotificationMessagModel;
      message=new NotificationMessagModel();
      // message.Action="Test";
      // message.EntityType="Test";
       return x;
    }));
  }

}

//exposed stomp thru nestJS -- Start
// import { Injectable } from '@angular/core';
// import { StompConfig, StompService,InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
// import { sockjs } from 'sockjs-client'
// import { Observable, observable, Subject } from 'rxjs';
// import { Message, Stomp, messageCallbackType } from '@stomp/stompjs';
// import { filter, map } from "rxjs/operators";
// import { NotificationMessagModel } from '../model/message-model';
// import { Guid } from '../utils/guid';
// import { RxStomp } from '@stomp/rx-stomp';

// export const clientSessionGuid:Guid = Guid.create();

// export const myRxStompConfig: InjectableRxStompConfig = {
//   // Which server?
//   brokerURL: 'ws://localhost:3001',

//   // Headers
//   // Typical keys: login, passcode, host
//   connectHeaders: {
//     login: 'guest',
//     passcode: 'guest',
//     clientSessionId:clientSessionGuid.toJSON()
//   },

//   disconnectHeaders:{
//     clientSessionId:clientSessionGuid.toJSON()
//   },

//   // How often to heartbeat?
//   // Interval in milliseconds, set to 0 to disable
//   heartbeatIncoming: 0, // Typical value 0 - disabled
//   heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

//   // Wait in milliseconds before attempting auto reconnect
//   // Set to 0 to disable
//   // Typical value 500 (500 milli seconds)
//   reconnectDelay: 0,
  

//   // Will log diagnostics on console
//   // It can be quite verbose, not recommended in production
//   // Skip this key to stop logging to console
//   debug: (msg: string): void => {
//     console.log(new Date(), msg);
//   },
  
  
// };


// @Injectable({
//   providedIn: 'root'
// })
// export class PmNotificationService {

//   //Stomp :any = require('@stomp/stompjs');

//   //Client:any;

//   messageObservable:Subject<Message>;

//   //eventObservable:Observable<Message>;

//   constructor(private rxStompService: RxStompService) {
// //    this.Stomp=require('@stomp/stompjs');
//   //  this.Client=this.Stomp.client("ws://localhost:3001");

  
//     this.messageObservable=new Subject<Message>();
//     //this.eventObservable=
//     this.rxStompService.stompClient.beforeConnect=()=>{
//       this.rxStompService.stompClient.connectHeaders
//     };
//     //this.rxStompService.activate();
//     this.rxStompService.watch("/Subscribe",{"ack":"auto","id:":"sub-0","Header1":"Header1Vaue"}).subscribe(x=>{
//       console.log("Received message from Subscribe ->" + JSON.stringify(x));
// this.messageObservable.next(x);
//     });

//     this.rxStompService.unhandledMessage$.subscribe(x=>{
//       console.log("connected");
//     });

    
//     this.rxStompService.connected$.subscribe(x=>{
//       console.log("connected");
//     });
//     this.rxStompService.stompErrors$.subscribe(x=>{
//       console.log("stomp error:" + x.toString);
//     });
//     this.rxStompService.unhandledReceipts$.subscribe(x=>{
//       console.log("unhandledReceipts error:" + x.toString);
//     });

//     this.rxStompService.stompClient.webSocket.onmessage=evt =>{

//       console.log("Event Data Start");
//       console.log(evt);
//       console.log("Event Data End");
//       // //let data = evt.data as Message;
//       // let b= JSON.parse(evt.data) as Message;

      

//       // let c= JSON.parse(b.body) as Message;
      
//       // //let d= b.body as NotificationMessagModel;
//       // //let message =data.body as NotificationMessagModel;
//       // console.log(c);
//     };
    
//   }

//   public WhenEvents(): Observable<NotificationMessagModel> {

    

//     return this.messageObservable.pipe(map(x=>{
//       var message:NotificationMessagModel;
//       message=new NotificationMessagModel();
//       message.Action="Test";
//       message.EntityType="Test";
//       return message;
//     }));
//   }

// }

//exposed stomp thru nestJS -- End


//Old Server Send Events Code -- Start

// import { Injectable } from '@angular/core';
// import { StompConfig, StompService } from '@stomp/ng2-stompjs';
// import { sockjs } from 'sockjs-client'
// import { Observable, observable, Subject } from 'rxjs';
// import { Message } from '@stomp/stompjs';
// import { filter } from "rxjs/operators";
// import { NotificationMessagModel } from '../model/message-model';
// import { Guid } from '../utils/guid';


// // const stompConfig: StompConfig = {
// //   // Which server?
// //   url: ()=>new sockjs ('http://localhost:55887/Notification/Subscribe'),

// //   // Headers
// //   // Typical keys: login, passcode, host
// //   headers: {
// //     login: 'guest',
// //     passcode: 'guest'
// //   },

// //   // How often to heartbeat?
// //   // Interval in milliseconds, set to 0 to disable
// //   heartbeat_in: 0, // Typical value 0 - disabled
// //   heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

// //   // Wait in milliseconds before attempting auto reconnect
// //   // Set to 0 to disable
// //   // Typical value 5000 (5 seconds)
// //   reconnect_delay: 5000,

// //   // Will log diagnostics on console
// //   debug: true
// // };

// @Injectable({
//   providedIn: 'root'
// })
// export class PmNotificationService {
//   private sse: any;
//   private record: Subject<NotificationMessagModel>;

//   init: string = 'Init';
//   clientSessionId: string;
//   private clientSessionGuid:Guid = Guid.create();

//   constructor() {
//     var EventSource = window['EventSource'];
//     this.sse = new EventSource('http://localhost:55887/Notification/Subscribe/'+this.clientSessionGuid.toString());
//     //this.sse = new EventSource('http://localhost:55887/Notification/Subscribe');
//     this.record = new Subject<any>();

//     this.sse.onopen = evt => {
//       console.log(evt);
//     };

//     this.sse.onmessage = evt => {
//       if (evt.data instanceof NotificationMessagModel) {
//         let data = evt.data as NotificationMessagModel;
//         if(data.Action===this.init)
//         {
//           this.clientSessionId = data.SessionId;
//         }
//         else
//         {
//           this.record.next(data)
//         }
        
//       }
//     };

//     // this.sse.addEventListener('message', function(e) {
//     //   var data = JSON.parse(e.data);
//     //   console.log(data.msg);
//     // }, false);

//     // this.record.pipe(filter(x => { return x.Action === this.init; })).subscribe(x => {
//     //   this.clientSessionId = x.SessionId;
//     // });

//   }

//   public WhenEvents(): Observable<NotificationMessagModel> {
//     return this.record.pipe(filter(x => { return x.Action != this.init; }));
//   }

//   // public WhenClientConnects(): Observable<NotificationMessagModel> {
//   //   return this.record.pipe(filter(x => { return x.Action === this.init; })).subscribe(x=>{});
//   // }
// }

//Old Server Send Events Code -- End