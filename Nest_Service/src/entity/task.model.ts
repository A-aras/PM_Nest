import { ProjectModel } from "./project.model";
import { UserModel } from "./user.model";

export class TaskModel {
    TaskId: number;
    ParentTask?: TaskModel;
    ChildTasks?: TaskModel[];
    ParentTaskId?: number;
    TaskDescription: string;
    StartDate?: Date;
    EndDate?: Date;
    Priority: number;
    IsClosed: boolean;
    IsParentTask: boolean;
    ProjectId: number;
    Project: ProjectModel;
    UserId: number;
    User: UserModel;


}