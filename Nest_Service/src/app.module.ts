import { Module,OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserService } from './user/user.service';
import {createConnection} from "typeorm";
import { DatabaseService } from './database.service';
import { UserController } from './controllers/user.controller';
import { ProjectService } from 'src/project/project.service';
import { ProjectController } from 'src/controllers/project.controller';
import { TaskService } from 'src/task/task.service';
import { TaskController } from 'src/controllers/task.controller';


@Module({
  imports: [],
  controllers: [AppController, UserController,ProjectController,TaskController],
  providers: [DatabaseService,AppService, UserService,ProjectService,TaskService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    
  }
}
