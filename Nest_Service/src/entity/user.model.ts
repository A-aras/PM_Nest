
import {Entity,Column,PrimaryGeneratedColumn, EntitySchema} from 'typeorm'
import { ProjectModel } from './project.model';
import { TaskModel } from './task.model';



// @Entity({name:'User'})
//  export  class UserModel
//  {
//      @PrimaryGeneratedColumn({name:'UserId'})
//     UserId:number;

//     @Column({name:'FName'})
//     FirstName:string;

//     @Column({name:'LName'})
//     LastName:string;

//     @Column({name:'EmpId'})
//     EmployeeId:number;
//  }




 export class UserModel
 {
    UserId:number;

    FirstName:string;

    LastName:string;

    EmployeeId:number;

    Projects: ProjectModel[];

    Tasks:TaskModel[];
 }

 