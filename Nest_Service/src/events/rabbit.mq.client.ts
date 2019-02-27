import { Injectable } from '@nestjs/common';
import { Stomp, StompConfig, CompatClient, Client, IPublishParams } from '@stomp/stompjs'
//import {connect,Connection,Message,MessageFields,MessageProperties,MessagePropertyHeaders,Channel,credentials} from 'amqplib'

export const myRxStompConfig: StompConfig = {
  // Which server?
  brokerURL: 'ws://localhost:15674/ws',

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
    //clientSessionId:clientSessionGuid.toJSON()
  },

  disconnectHeaders: {
    //clientSessionId:clientSessionGuid.toJSON()
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

var amqp = require('amqplib');

@Injectable()
export class AmqpClient {

  
  client: Client;

  constructor() {

    this.client = Stomp.client(myRxStompConfig.brokerURL);
    var headers = {
      login: 'guest',
      passcode: 'guest',
      // additional header
      'client-id': 'my-client-id'
    };

    this.client.configure(myRxStompConfig);

    this.client.activate();
  }

  configureAmqp()
  {
    amqp.connect('amqp://localhost:5672');
  }

  public onConnect() {

  };

  public publishMessage(queue: string, routing: string, message: string): void {

    let a: IPublishParams = {
      body: message,
      destination: queue,
      binaryBody: null,
      headers: null,
      skipContentLengthHeader: false,

    };
    if (routing === null || routing === undefined) {
      this.client.publish(a);
    }
    this.client.publish(a);
    //.send(queue, {priority: 9}, message);
    //this.rxStompService.publish({destination:queue,body:message,binaryBody:null});
  }
}