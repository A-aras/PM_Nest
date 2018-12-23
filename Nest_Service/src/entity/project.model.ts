import { UserModel } from "./user.model";
import { TaskModel } from "./task.model";

export class ProjectModel {
    ProjectId : number;
    ProjectManager     : UserModel;
    ProjectManagerId? : number ;
    Project: string ;
    StartDate?     : Date;
    EndDate?     : Date;
    Priority: number;
    Tasks: TaskModel[];
    NoOfClosedTasks:number;
    IsActive:boolean;
}
