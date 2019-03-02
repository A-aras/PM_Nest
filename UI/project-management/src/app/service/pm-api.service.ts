import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from 'url';
import { HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';

import { TaskModel } from '../model/task-model';
import { ProjectModel } from '../model/project-model';
import { UserModel } from '../model/user-model';
import { IPmApiService } from './pm-api.service-interface';
import { map, mapTo } from 'rxjs/operators';

@Injectable()
export class PmApiService extends IPmApiService {
    getAllParentTasksForProject(project: ProjectModel): Observable<TaskModel[]> {
        let header = new HttpHeaders();
        let params=new HttpParams();
        header.append('Contetnt-Type','application/json');

        params=params.set("ProjectId", project.ProjectId.toString());  
        params=params.set("Project",project.Project);
    
        let requestOptions={headers:header,params:params};
        return this.httpService.get<TaskModel[]>(environment.ApiService+"/Task/GetParentTasksForProject",requestOptions);
    }
    getTaskById(id: number): Observable<TaskModel> {
        return this.httpService.get<TaskModel>( environment.ApiService+"/Task/GetTaskById/"+id);
    }
    getTasks(): Observable<TaskModel[]> {
        return this.httpService.get<TaskModel[]>( environment.ApiService+"/Task/GetTasks");
    }
    getParentTasks(): Observable<TaskModel[]> {
        return this.httpService.get<TaskModel[]>( environment.ApiService+"/Task/GetParentTasks");
    }

     getAllTaskForProject(project: ProjectModel): Observable<TaskModel[]>
     {
        let header = new HttpHeaders();
        let params=new HttpParams();
        header.append('Contetnt-Type','application/json');

        params=params.set("ProjectId", project.ProjectId.toString());  
        params=params.set("Project",project.Project);
    
        //let body=new HttpBody();
    
        let requestOptions={headers:header,params:params};
        return this.httpService.get<TaskModel[]>(environment.ApiService+"/Task/GetAllTaskForProject",requestOptions);
     }

    AddTask(task: TaskModel) {
        return this.httpService.post(environment.ApiService+"/Task/AddTask", task);
    }
    UpdateTask(task: TaskModel): Observable<any> {
        return this.httpService.put(environment.ApiService+"/Task/UpdateTask/" + task.TaskId, task);
    }
    DeleteTask(task: TaskModel): Observable<any> {
        return this.httpService.delete(environment.ApiService+"/Task/DeleteTask/"+task.TaskId);
    }

    constructor(private httpService: HttpClient) { 
        super();
      }

      getUsersById(id:number): Observable<UserModel[]> {
        return this.httpService.get<UserModel[]>(environment.ApiService+ "/User/GetUserById/"+id).pipe(map((usersdto)=>{
            usersdto.map((userdto,index,usrs)=>{
                let userModel=new UserModel()
                .WithValue(x=>x.EmployeeId=userdto.EmployeeId)
                .WithValue(x=>x.FirstName=userdto.FirstName)
                .WithValue(x=>x.LastName=userdto.LastName)
                .WithValue(x=>x.UserId=userdto.UserId);
                usrs[index]=userModel;
            });
            return usersdto;
        },null))
    }

    getUsers(): Observable<UserModel[]> {
        return this.httpService.get<UserModel[]>(environment.ApiService+ "/User").pipe(map((usersdto)=>{
            usersdto.map((userdto,index,usrs)=>{
                let userModel=new UserModel()
                .WithValue(x=>x.EmployeeId=userdto.EmployeeId)
                .WithValue(x=>x.FirstName=userdto.FirstName)
                .WithValue(x=>x.LastName=userdto.LastName)
                .WithValue(x=>x.UserId=userdto.UserId);
                usrs[index]=userModel;
            });
            return usersdto;
        },null))
    }

    AddUser(user: UserModel) {
        return this.httpService.post(environment.ApiService+"/User/AddUser", user);
    }
    UpdateUser(user: UserModel): Observable<any> {
        return this.httpService.put(environment.ApiService+"/User/UpdateUser/" + user.UserId, user);
    }
    DeleteUser(user: UserModel): Observable<any> {
        return this.httpService.delete(environment.ApiService+"/User/DeleteUser/"+user.UserId);
    }

    getProjects(): Observable<ProjectModel[]> {
        return this.httpService.get<ProjectModel[]>( environment.ApiService+"/Project/GetProjects");
    }

    AddProject(project: ProjectModel) {
        return this.httpService.post(environment.ApiService+"/Project/AddProject", project);
    }
    UpdateProject(project: ProjectModel): Observable<any> {
        return this.httpService.put(environment.ApiService+"/Project/UpdateProject/" + project.ProjectId, project);
    }

  }
  