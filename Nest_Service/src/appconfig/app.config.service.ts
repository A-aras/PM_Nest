import { Module,Injectable } from '@nestjs/common';
import { ConfigService } from './../config/config.service';


@Injectable()
export class AppConfigService {
  
  protocol:string;
  hostname:string;
  port:number;
  username:string;
  password:string;
  heartbeat:number;

  constructor(config: ConfigService) {
    // Please take note that this check is case sensitive!
    this.protocol = config.get('protocol') === undefined  ? "amqp" : config.get('protocol');
    this.hostname = config.get('hostname') === undefined  ? "localhost" : config.get('hostname');
    this.port = config.get('port') === undefined  ? 5672 : Number.parseInt(config.get('port'));
    this.username = config.get('username') === undefined  ? "guest" : config.get('username');
    this.password = config.get('password') === undefined  ? "guest" : config.get('password');
    this.heartbeat = config.get('heartbeat') === undefined  ? 5 : Number.parseInt(config.get('heartbeat'));
  }
}