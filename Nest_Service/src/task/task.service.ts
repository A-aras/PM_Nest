import { Injectable, Catch } from '@nestjs/common';
import { ProjectModel } from '../entity/project.model';
import { getConnection, getRepository, Repository, getConnectionOptions, createConnection,EntityManager, Equal, Any } from 'typeorm'
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

    GetParentTasksForProject(project:ProjectModel): Promise<TaskModel[]> {
        return this.repo.find({relations:['User','ParentTask'],where:{
            ProjectId: Equal(project.ProjectId),
            ChildTasks: Any
        }}).then(x=>{
            return x;
        });
        //return ServiceMockData.Users;
    }

    GetAllTaskForProject(project:ProjectModel): Promise<TaskModel[]> {
        return this.repo.find({relations:['User','ParentTask'],where:{
            ProjectId: Equal(project.ProjectId)
        }}).then(x=>{
            return x;
        });
        //return ServiceMockData.Users;
    }


    GetParentTasks(): Promise<TaskModel[]> {
        return this.repo.find({relations:['User','ParentTask'],where:{
            ChildTasks: Any
        }}).then(x=>{
            return x;
        });
        //return ServiceMockData.Users;
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

    GetTaskById(id: number): Promise<TaskModel> {
        return this.repo.findOne({relations:['User','ParentTask','Project'],where:{
            TaskId:Equal(id)
        }}).then(x=>{
            return x;
        });
        //return ServiceMockData.Users;
    }
}