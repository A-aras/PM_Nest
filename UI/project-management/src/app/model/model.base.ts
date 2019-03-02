import { TaskModel } from "./task-model";
import { Comparer } from "@ngrx/entity/src/models";
//import { TaskModel } from "./task-model";

//type WithValueFunctionType = (model: ModelBase, value: any) => ModelBase;

export interface UniqueIdentifier
{
    //Indentifier():string;
    
}

export abstract class ModelBase  {

    Indentifier:()=>string;

    // public get Name() {
    //     return "";
    // }

     //Indentifier: (model:this) => string;
    // UniqueueIndentifier:string;
    WithValue(valueFn:(model:this)=>void):this{
        valueFn(this);
        return this;
    };
}


