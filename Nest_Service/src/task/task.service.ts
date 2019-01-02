import { Injectable, Catch } from '@nestjs/common';
import { ProjectModel } from '../entity/project.model';
import { getConnection, getRepository, Repository, getConnectionOptions, createConnection,EntityManager } from 'typeorm'
import { DatabaseService } from '../database.service';
import { filter } from 'rxjs/operators';
import { ProjectEntity } from '../entity/project.schema';
import { TaskModel } from '../entity/task.model';
import { TaskEntity } from '../entity/task.schema';
//import { ServiceMockData } from '../mock/mock.data';

@Injectable()
export class TaskService {
    repo: Repository<TaskModel>;
    constructor(dbservice:DatabaseService) {

        // getConnectionOptions().then(x=>

        //     createConnection(x)).then(connection => {
        //         this.repo =connection.getRepository(UserModel);
        //         // here you can start to work with your entities
        //     }).catch(error => console.log(error));
            
            dbservice.connectionEstablished
            .pipe(filter((x)=>{
                return x===true;
            }))
            .subscribe(x=>
                {
                    
                var repo= dbservice.dbConnection.getRepository(TaskEntity)
                this.repo=repo;
            });

    }
    GetTasks(): Promise<TaskModel[]> {
        return this.repo.find({relations:['User','ParentTask']}).then(x=>{
            return x;
        });
        //return ServiceMockData.Users;
    }

    AddTask(task: TaskModel): Promise<TaskModel> {
        return this.repo.save(task);
    }

    UpdateTask(task: TaskModel): Promise<TaskModel> {
        return this.repo.save(task);
    }

    DeleteTask(id: number):Promise<TaskModel> {
        return this.repo.findOne(id).then(x=>{
            return this.repo.remove(x);
        });
        
    }
}
