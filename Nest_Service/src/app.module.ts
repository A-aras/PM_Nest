import { Module,OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserService } from './user/user.service';
import {createConnection} from "typeorm";
import { DatabaseService } from './database.service';
import { UserController } from './controllers/user.controller';


@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [DatabaseService,AppService, UserService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    
  }
}
