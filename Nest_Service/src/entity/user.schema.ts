
import {Entity,Column,PrimaryGeneratedColumn, EntitySchema} from 'typeorm'
import { UserModel } from './user.model';



export const UserEntity=new EntitySchema<UserModel>({
    name: "User",
    columns: {
        UserId: {
            name:"UserId",
            type: Number,
            primary: true,
            generated: true,
            readonly:true,
        },
        FirstName: {
            name:"FName",
            type: String
        },
        LastName: {
            name:"LName",
            type: String
        },
        EmployeeId: {
            name:"EmpId",
            type: Number
        }
    },

    relations:{
         Projects :
        {
            type:"one-to-many",
            target:"Project",
            inverseSide:"ProjectManager"
            //joinColumn:{name:"UserId",referencedColumnName:"ProjectManagerId"},

            
        },

        // Tasks :
        // {
        //     type:"many-to-one",
        //     target:"Task",
        //     joinColumn:{name:"UserId",referencedColumnName:"UserId"},
        //     //cascade:  ["remove","insert"],
            
        // },
    }

 });
