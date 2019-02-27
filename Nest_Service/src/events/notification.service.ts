import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
} from '@nestjs/websockets';
import { Message, StompHeaders, FrameImpl } from "@stomp/stompjs"
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'http';
import { PMFrameImpl } from './I-Frame';
import { InjectableRxStompConfig, RxStompService } from '@stomp/ng2-stompjs';


export const myRxStompConfig: InjectableRxStompConfig = {
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

//@WebSocketGateway(2020,{path:"event",namespace:"event"})
@WebSocketGateway(3001, { namespace: "event" })
export class NotificationService implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    wsClients = [];
    @WebSocketServer() server;


    private GetConnectFrame(params: {
        command: string, headers?: StompHeaders,
        body?: string, binaryBody?: Uint8Array, skipContentLengthHeader?: boolean
    }): PMFrameImpl {
        const { command, headers, body, binaryBody, skipContentLengthHeader } = params;
        const frame = new PMFrameImpl({
            command,
            headers,
            body,
            binaryBody,
            escapeHeaderValues: false,
            skipContentLengthHeader
        });

        frame.isBinaryBody = false;

        return frame;
    }

    handleConnection(client: any, ...args: any[]) {


        this.wsClients.push(client);

        client.onmessage = (msg: any) => {

        };

        var frame = this.GetConnectFrame({
            command: "CONNECTED", headers: {
                "destination": "/Subscribe",
                "content-type": "text/plain"
            }, body: "", binaryBody: null, skipContentLengthHeader: true
        });

        let rawChunk = frame.serialize();

        client.send(rawChunk);

        //         var frame="CONNECTED\r\n\
        // destination:/Subscribe\r\n\
        // content-type:text/plain\r\n\
        // abcd\r\n\
        // ^@";
        //client.send(frame);

        // let headers:StompHeaders={"destination" : "/Subscribe",
        // "content-type": "text/plain"};

        // const frame = new FrameImpl({
        //     "CONNECTED",
        //     { "destination" : "/Subscribe",
        //                     "content-type": "text/plain"},
        //     "",
        //     null,
        //     true
        //     true
        //   });

        //         let stompMessage: FrameImpl={
        //             command:"CONNECTED",
        //             headers: {
        //                 "destination" : "/Subscribe",
        //                 "content-type": "text/plain"
        //             },
        //             body:null,
        //             binaryBody:null,
        //             isBinaryBody:false,
        //             serializeCmdAndHeaders:true,
        //             skipContentLengthHeader:true,
        //             isBodyEmpty:true,
        //             bodyLength:5,
        //             escapeHeaderValues:true,
        //         };

        //         let stompMessageString = JSON.stringify(stompMessage);

        //         client.send(stompMessageString);
    }

    handleDisconnect(client: any) {
        if (client != undefined) {
            for (let i = 0; i <= this.wsClients.length; i++) {
                if (client === this.wsClients[i]) {
                    this.wsClients.splice(i);
                    break;
                }
            }
        }

        this.broadcast('disconnect', {});
    }

    broadcast(event, message: any) {

        let broadCastMessage = JSON.stringify(message);
        let frame = this.GetConnectFrame({
            command: "MESSAGE", headers: {
                "destination": "/Subscribe",
                "content-type": "text/plain"
            }, body: broadCastMessage, binaryBody: null, skipContentLengthHeader: true
        });

        let rawChunk = frame.serialize();

        //client.send(rawChunk);

        //let broadCastMessage = JSON.stringify(message);
        for (let c of this.wsClients) {
            // let stompMessage: Message={
            //     command:"MESSAGE",
            //     headers: {
            //         "destination" : "/Subscribe",
            //         "content-type": "text/plain"
            //     },
            //     body:broadCastMessage,
            //     ack:null,
            //     binaryBody:null,
            //     isBinaryBody:false,
            //     nack:null
            // };

            // let stompMessageString = JSON.stringify(stompMessage);
            c.send(rawChunk);


        }
    }

    afterInit(server: any) {
        this.server.emit('Gatway initialized', { do: 'stuff' });
    }

    // @SubscribeMessage('Subscribe')
    // onSubscribe(client: any, payload: any) {
    //     this.wsClients.push(client);
    //     //this.handleConnection(client,payload);
    //     return payload;

    // }

    // @SubscribeMessage('')
    // onEvent(client: any, payload: any) {
    //     return payload;

    // }
}