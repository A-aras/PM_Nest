import { Injectable, Catch } from '@nestjs/common';
import { ProjectModel } from '../entity/project.model';
import { getConnection, getRepository, Repository, getConnectionOptions, createConnection,EntityManager } from 'typeorm'
import { DatabaseService } from '../database.service';
import { filter } from 'rxjs/operators';
import { ProjectEntity } from '../entity/project.schema';
//import { ServiceMockData } from '../mock/mock.data';

@Injectable()
export class ProjectService {
    repo: Repository<ProjectModel>;
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
                    
                var repo= dbservice.dbConnection.getRepository(ProjectEntity)
                this.repo=repo;
            });

    }
    GetProjects(): Promise<ProjectModel[]> {
        return this.repo.find({relations:["ProjectManager","Tasks"]}).then(x=>{
            return x;
        });
        //return ServiceMockData.Users;
    }

    AddProject(user: ProjectModel): Promise<ProjectModel> {
        return this.repo.save(user);
    }

    UpdateProject(user: ProjectModel): Promise<ProjectModel> {
        return this.repo.save(user);
    }

    DeleteProject(id: number):Promise<ProjectModel> {
        return this.repo.findOne(id).then(x=>{
            return this.repo.remove(x);
        });
        
    }
}