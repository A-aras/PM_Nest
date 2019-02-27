import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserService } from './user/user.service';
import { createConnection } from "typeorm";
import { DatabaseService } from './database.service';
import { UserController } from './controllers/user.controller';
import { ProjectService } from './project/project.service';
import { ProjectController } from './controllers/project.controller';
import { TaskService } from './task/task.service';
import { TaskController } from './controllers/task.controller';
import { NotificationService } from './events/notification.service';
import { TextEncoder, TextDecoder } from "text-encoding"
import { AmqpClient } from './events/rabbit.mq.client';
import { AmqpPushService } from './events/amqp.push.service';
import { ConfigModule } from './config/config.module';
import { AppConfigService } from './appconfig/app.config.service';

// import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory, StompService } from '@stomp/ng2-stompjs';
// import { myRxStompConfig } from './events/rabbit.mq.client';
//import { RxStompConfig, RxStomp,rx } from '@stomp/rx-stomp';

// const AmqpPushServiceProvider = {
//   provide: AmqpPushService,
//   useClass: AmqpPushService,

// };

@Module({
  imports: [ConfigModule],
  controllers: [AppController, UserController, ProjectController, TaskController],
  providers: [AppConfigService,DatabaseService, AppService, UserService, ProjectService, TaskService, NotificationService, TextEncoder, TextDecoder,
    AmqpPushService],

})
export class AppModule implements OnModuleInit {
  onModuleInit() {

  }
}
