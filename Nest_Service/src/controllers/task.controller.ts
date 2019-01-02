import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ServiceMockData } from '../mock/mock.data';
import { TaskModel } from '../entity/task.model';
import { TaskService } from '../task/task.service';


@Controller('Task')
export class TaskController {

    constructor(private service: TaskService) { }
    @Get()
    GetTasks(): Promise<TaskModel[]> {
        var a = this.service.GetTasks();
        a.catch(function (x) {
            console.log(x);
        })
        return a;

    }

    @Post()
    AddProject( @Body() project: TaskModel): Promise<TaskModel> {
        return this.service.AddTask(project);
    }

    @Put(':id')
    UpdateProject( @Param() id: number, @Body() project: TaskModel): Promise<TaskModel> {
        return this.service.UpdateTask(project);
    }

    @Delete(':id')
    DeleteProject( @Param() id: number): Promise<TaskModel> {
        return this.service.DeleteTask(id);
    }
}