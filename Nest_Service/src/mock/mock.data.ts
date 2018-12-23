import { UserModel } from "../entity/user.model";
import { ProjectModel } from "../entity/project.model";
import { TaskModel } from "../entity/task.model";

export class ServiceMockData {


    public static User1: UserModel = {
        UserId: 1,
        FirstName: "FName1",
        LastName: "LName1",
        EmployeeId: 1,
    };

    public static User2: UserModel = {
        UserId: 2,
        FirstName: "FName2",
        LastName: "LName2",
        EmployeeId: 2,
    };

    public static Users: UserModel[] = [
        ServiceMockData.User1, ServiceMockData.User2
    ];

    private static Project1: ProjectModel={
        ProjectId : 1,
        Project : "Project1",
        StartDate : new Date(2018, 9, 1),
        EndDate : new Date(2018,9,30),
        IsActive : true,
        Priority : 10,
        ProjectManager : ServiceMockData.User1,
        ProjectManagerId : ServiceMockData.User1.UserId,
        Tasks:null,
        NoOfClosedTasks:0
    };

    private static Project2: ProjectModel={
        ProjectId : 2,
        Project : "Project2",
        StartDate : new Date(2018, 10, 1),
        EndDate : new Date(2018, 10, 31),
        IsActive : true,
        Priority : 20,
        ProjectManager : ServiceMockData.User2,
        ProjectManagerId : ServiceMockData.User2.UserId,
        Tasks:null,
        NoOfClosedTasks:0
    };

    private static Project1_ParentTask1: TaskModel={
        TaskId : 1,
        TaskDescription : "ParentTask1",
        IsParentTask : true,
        IsClosed : false,
        User : null,
        UserId : null,
        ParentTask : null,
        ParentTaskId : null,
        ProjectId : ServiceMockData.Project1.ProjectId,
        //ChildTasks :[PMApiServiceMockData.Project1_ParentTask1_ChildTask1],
        ChildTasks:null,
        StartDate:null,
        EndDate:null,
        Priority:0,
        Project:ServiceMockData.Project1
    };

    public static Project1_ParentTask1_ChildTask1: TaskModel={
        TaskId : 2,
        TaskDescription : "Project1_ParentTask1_ChildTask1",
        IsParentTask : false,
        IsClosed : false,
        User : null,
        UserId : null,
        ParentTask : null,
        ParentTaskId : null,
        ProjectId : ServiceMockData.Project1.ProjectId,
        ChildTasks :null,
        StartDate:null,
        EndDate:null,
        Priority:0,
        Project:ServiceMockData.Project1
    };

    public static Project1_ParentTask1_ChildTask2: TaskModel={
        TaskId : 2,
        TaskDescription : "Project1_ParentTask1_ChildTask2",
        IsParentTask : false,
        IsClosed : false,
        User : null,
        UserId : null,
        ParentTask : null,
        ParentTaskId : null,
        ProjectId : ServiceMockData.Project1.ProjectId,
        ChildTasks :null,
        StartDate:null,
        EndDate:null,
        Priority:0,
        Project:ServiceMockData .Project1
    };

    public static Project1_ParentTask1_WithChildTasks():TaskModel
    {
        var task=ServiceMockData.Project1_ParentTask1;
        task.ChildTasks=[ServiceMockData.Project1_ParentTask1_ChildTask1];
        return  task;
    }

    public static Tasks: TaskModel[] = [
        ServiceMockData.Project1_ParentTask1_WithChildTasks(), ServiceMockData.Project1_ParentTask1_ChildTask1,ServiceMockData.Project1_ParentTask1_ChildTask2
    ];

    public static Project1_WithAll():ProjectModel
    {
        var project=ServiceMockData.Project1;
        project.Tasks=ServiceMockData.Tasks;
        return project;
    }

    public static Projects: ProjectModel[] = [
        ServiceMockData.Project1_WithAll(), ServiceMockData.Project2
    ];
}