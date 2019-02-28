import { Injectable } from '@angular/core';
import { InjectableRxStompConfig, RxStompService } from '@stomp/ng2-stompjs';
import { Message, FrameImpl, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { NotificationMessagModel } from '../model/message-model';
import { Guid } from '../utils/guid';

export const clientSessionGuid: Guid = Guid.create();

export const myRxStompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: 'ws://localhost:15674/ws',

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
    clientSessionId: clientSessionGuid.toJSON()
  },

  disconnectHeaders: {
    clientSessionId: clientSessionGuid.toJSON()
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


// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class PmNotificationService {

  messageObservable: Subject<NotificationMessagModel>;

  constructor(private rxStompService: RxStompService) {

    this.messageObservable = new Subject<NotificationMessagModel>();


    this.rxStompService.watch("/queue/test").subscribe(x => {
      console.log("Received message from Subscribe ->" + JSON.stringify(x));

      let frame = <IMessage>x;

      let b = JSON.parse(frame.body) as NotificationMessagModel;
      this.messageObservable.next(b);
    });

  }

  public WhenEvents(): Observable<NotificationMessagModel> {
    return this.messageObservable.pipe(map(x => {
      var message: NotificationMessagModel;
      message = new NotificationMessagModel();
      // message.Action="Test";
      // message.EntityType="Test";
      return x;
    }));
  }

}

