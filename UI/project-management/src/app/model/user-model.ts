import { TaskModel } from "./task-model";
import { ModelBase } from "./model.base";



export class UserModel extends ModelBase {

    
    // Indentifier(): string {
    //     return this.UserId.toString();
    // }
    UserId: number;
    FirstName     : string;
    LastName: string ;
    EmployeeId: number|null ;
    //ProjectId: number|null;
    //TaskId     : number|null;
    //Task     : TaskModel |null;
    /**
     *
     */
    constructor() {
        super();
        this.Indentifier = () => this.UserId.toString();
    }
    
}
