
import {Entity,Column,PrimaryGeneratedColumn, EntitySchema} from 'typeorm'
import { UserModel } from './user.model';
import { ProjectModel } from './project.model';
import { TaskModel } from './task.model';



export const TaskEntity=new EntitySchema<TaskModel>({
    name: "Task",
    columns: {
        TaskId: {
            name:"Task_Id",
            type: Number,
            primary: true,
            generated: true
        },
        ParentTaskId: {
            name:"ParentTaskId",
            type: Number,
            nullable: true,
        },
        TaskDescription: {
            name:"Task",
            type: String
        },
        StartDate: {
            name:"StartDate",
            type: Date,
            nullable:true
        },
        EndDate: {
            name:"EndDate",
            type: Date,
            nullable:true
        },
        Priority : {
            name:"Priority",
            type: Number,
            nullable:true
        },
        IsClosed : {
            name:"IsClosed",
            type: Boolean,
        },
        IsParentTask : {
            name:"IsParentTask",
            type: Boolean,
        },
        ProjectId : {
            name:"ProjectId",
            type: Number,
        },
        UserId : {
            name:"UserId",
            type: Number,
        }
    },
    relations:{
        User:
        {
            type:"many-to-one",
            target:"User",
            joinColumn:{name:"UserId",referencedColumnName:"UserId"},
            //eager:true
        },
        ParentTask:
        {
            type:"many-to-one",
            target:"Task",
            joinColumn:{name:"ParentTaskId",referencedColumnName:"TaskId"},
        }
        // Project:{
        //     type:"many-to-one",
        //     target:"Project",
        //     joinColumn:{name:"ProjectId",referencedColumnName:"ProjectId"},
        //     eager:true
        // }
    }
 });