import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ServiceMockData } from '../mock/mock.data';
import { TaskModel } from '../entity/task.model';
import { TaskService } from '../task/task.service';
import { NotificationService } from '../events/notification.service';
import { ProjectModel } from '../entity/project.model';


@Controller('Task')
export class TaskController {

    constructor(private service: TaskService,private notificationService:NotificationService) { }
   
    @Get("GetTasks")
    GetTasks(): Promise<TaskModel[]> {
        var a = this.service.GetTasks();
        a.catch(function (x) {
            console.log(x);
        })


        return a;
        
    }

    @Get("GetParentTasksForProject")
    GetParentTasksForProject(@Query() project: ProjectModel): Promise<TaskModel[]> {
        var a = this.service.GetParentTasksForProject(project);
        a.catch(function (x) {
            console.log(x);
        })
   return a;
        
    }

    @Get("GetAllTaskForProject")
    GetAllTaskForProject(@Query() task: ProjectModel): Promise<TaskModel[]> {
        var a = this.service.GetAllTaskForProject(task);
        a.catch(function (x) {
            console.log(x);
        })
   return a;
        
    }

    @Get("GetParentTasks")
    GetParentTasks(): Promise<TaskModel[]> {
        var a = this.service.GetParentTasks();
        a.catch(function (x) {
            console.log(x);
        })
   return a;
        
    }

    @Post("AddTask")
    AddTask( @Body() task: TaskModel): Promise<TaskModel> {
        return this.service.AddTask(task);
    }

    @Put('UpdateTask/:id')
    UpdateTask(@Param() id:number, @Body() task: TaskModel): Promise<TaskModel> {
        return this.service.UpdateTask(task);
    }

    @Delete('DeleteTask/:id')
    DeleteTask( @Param() id: number): Promise<TaskModel> {
        return this.service.DeleteTask(id);
    }

    @Get("GetTaskById/:id")
    public  GetTaskById( @Param('id') id : number): Promise<TaskModel>
    {

        var a = this.service.GetTaskById(id);
        a.catch(function (x) {
            console.log(x);
        })
   return a;

    }
}