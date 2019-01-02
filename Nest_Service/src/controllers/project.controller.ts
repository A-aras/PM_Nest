import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectModel } from '../entity/project.model';
import { ServiceMockData } from '../mock/mock.data';
import { ProjectService } from 'src/project/project.service';


@Controller('Project')
export class ProjectController {

    constructor(private service: ProjectService) { }
    @Get()
    GetProjects(): Promise<ProjectModel[]> {
        var a = this.service.GetProjects();
        a.catch(function (x) {
            console.log(x);
        })
        return a;

    }

    @Post()
    AddProject( @Body() project: ProjectModel): Promise<ProjectModel> {
        return this.service.AddProject(project);
    }

    @Put(':id')
    UpdateProject( @Param() id: number, @Body() project: ProjectModel): Promise<ProjectModel> {
        return this.service.UpdateProject(project);
    }

    @Delete(':id')
    DeleteProject( @Param() id: number): Promise<ProjectModel> {
        return this.service.DeleteProject(id);
    }
}