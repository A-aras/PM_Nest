import { Injectable } from '@nestjs/common';
// import { Stomp, StompConfig, CompatClient, Client, IPublishParams } from '@stomp/stompjs'
import { connect, Connection, Message, MessageFields, MessageProperties, MessagePropertyHeaders, Channel, credentials, Options } from 'amqplib'
import { AppConfigService } from './../appconfig/app.config.service';



// export const amqpConfig: Options.Connect = {
//     protocol: 'amqp',
//     hostname: 'localhost',
//     port: 5672,
//     username: 'guest',
//     password: 'guest',
//     heartbeat:10,
// };

@Injectable()
export class AmqpPushService {

    connection: Connection;
    channel:Channel;

    constructor(private appconfig:AppConfigService) {
        const config: Options.Connect = {
                protocol: this.appconfig.protocol,
                hostname: this.appconfig.hostname,
                port: this.appconfig.port,
                username: this.appconfig.username,
                password: this.appconfig.password,
                heartbeat:this.appconfig.heartbeat,
            };

        connect(config).then(connection => {
            this.connection = connection;
            connection.createChannel().then(channel=>this.channel=channel);
        }, x => {
            console.log("Error occured while connecting -> " + x);
        });
    }

    public publishMessage(exchange: string, routing: string, message: string): void {
        this.channel.publish(exchange, routing, Buffer.from(message));
    }
}