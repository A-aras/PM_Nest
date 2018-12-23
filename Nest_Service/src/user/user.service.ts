import { Injectable, Catch } from '@nestjs/common';
import { UserModel } from '../entity/user.model';
import { getConnection, getRepository, Repository, getConnectionOptions, createConnection,EntityManager } from 'typeorm'
import { DatabaseService } from '../database.service';
import { filter } from 'rxjs/operators';
import { UserEntity } from '../entity/user.schema';
//import { ServiceMockData } from '../mock/mock.data';

@Injectable()
export class UserService {
    repo: Repository<UserModel>;
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
                    
                var repo= dbservice.dbConnection.getRepository(UserEntity)
                this.repo=repo;
            });

    }
    GetUsers(): Promise<UserModel[]> {
        return this.repo.find().then(x=>{
            return x;
        });
        //return ServiceMockData.Users;
    }

    AddUser(user: UserModel): Promise<UserModel> {
        return this.repo.save(user);
    }

    UpdateUser(user: UserModel): Promise<UserModel> {
        return this.repo.save(user);
    }

    DeleteUser(id: number):Promise<UserModel> {
        return this.repo.findOne(id).then(x=>{
            return this.repo.remove(x);
        });
        
    }
}
