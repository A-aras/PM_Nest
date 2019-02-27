import { Injectable } from "@nestjs/common";
import { createConnection, getConnectionOptions, Connection } from "typeorm";
import { UserModel } from "./entity/user.model";
import { Subject } from "rxjs";
import { UserEntity } from "./entity/user.schema";
import { ProjectEntity } from "./entity/project.schema";
import { TaskEntity } from "./entity/task.schema";
//import { UserModel } from "dist/src/entity/user.model";

@Injectable()
export class DatabaseService {

    // constructor() {
    //     // read connection options from ormconfig file (or ENV variables)
    //     getConnectionOptions().then(x => {
    //         return createConnection(x);
    //     }
    //     ).then(connection => {
    //         connection.getRepository(UserModel);
    //         // here you can start to work with your entities
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }

    public connectionEstablished: Subject<boolean> = new Subject<boolean>();

    public dbConnection:Connection;

    constructor(){
        createConnection({
                type: "mssql",
                host: "DMAA-PG00BLLV\\SQLEXPRESS",
                username: "sa",
                password: "sa",
                database: "ProjectManagmentDb",
                
                entities: [UserEntity,ProjectEntity,TaskEntity
                   
                ],
                // migrations: [
                //     "dist/migration/**/*.js"
                // ],
                // subscribers: [
                //     "dist/subscriber/**/*.js"
                // ],

                synchronize: false,
                logging:"all",
                logger:"advanced-console"
                
        }).then(connection => {
            
            this.dbConnection=connection;
            this.connectionEstablished.next(true);
            //connection.getRepository(UserModel);
            // here you can start to work with your entities
        }).catch(error => {
            console.log(error);
        });
    }


}