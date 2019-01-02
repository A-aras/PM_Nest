
import {Entity,Column,PrimaryGeneratedColumn, EntitySchema} from 'typeorm'
import { UserModel } from './user.model';



export const UserEntity=new EntitySchema<UserModel>({
    name: "User",
    columns: {
        UserId: {
            name:"UserId",
            type: Number,
            primary: true,
            generated: true
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
    // relations:{
    //     pro:
    //     {
    //         type:"one-to-many",
    //         target:"User",
    //     },
    // }
 });