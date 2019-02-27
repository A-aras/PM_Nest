import {Entity,Column,PrimaryGeneratedColumn, EntitySchema} from 'typeorm'
import { UserModel } from './user.model';
import { ProjectModel } from './project.model';
import { TaskModel } from './task.model';



export const ProjectEntity=new EntitySchema<ProjectModel>({
    name: "Project",
    columns: {
        ProjectId: {
            name:"ProjectId",
            type: Number,
            primary: true,
            generated: true
        },
        Project: {
            name:"Project",
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
        IsActive:{
            name:"IsActive",
            type:Boolean
        },
        ProjectManagerId:{
            name:"ProjectManagerId",
            type:Number
        },
        Priority:{
            name:"Priority",
            type:Number
        },
    },
    relations:{
        ProjectManager:
        {
            type:"many-to-one",
            target:"User",
            joinColumn:{name:"ProjectManagerId",referencedColumnName:"UserId"},
            // eager:true,
            cascade:true,
            onDelete:"CASCADE",
            inverseSide:"Projects"
        },

        Tasks:{
            type:"one-to-many",
            target:"Task",
            joinColumn:{name:"ProjectId",referencedColumnName:"ProjectId"},
             nullable:true,
             cascade:true,
             onDelete:"CASCADE",
             inverseSide:"Project"
            //cascade:  ["remove","insert"]
        }
    }
 });