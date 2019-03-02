// import { Injectable } from '@angular/core'
// import { Action } from '@ngrx/store'
// import { UserModel } from './../../model/user-model'
// import { ModelBase } from 'src/app/model/model.base';
// import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';

// // export const ADD = 'User - Add'
// // export const REMOVE = 'User - Remove'
// // export const UPDATE = 'User - Update'
// // export const LOAD = 'User - Load'

// export enum EntityType {
//     Add = 'Add',
//     Remove = 'Remove',
//     Update = 'Update',
//     OnLoad = 'OnLoad',
//     Loaded='Load',
//   }

// export class AddToRepository<T extends ModelBase>  implements Action {

//     readonly type = EntityType.Add;

//     constructor(public payload: T) { }
// }

// export class RemoveFromRepository<T extends ModelBase> implements Action {
//     readonly type = EntityType.Remove;

//     constructor(public payload: T) { }
// }

// export class UpdateRepository<T extends ModelBase>  implements Action {
//     readonly type = EntityType.Update;

//     constructor(public payload: T) { }
// }

// export class LoadRepository<T extends ModelBase>  implements Action {
//     readonly type = EntityType.Loaded;

//     constructor(public payload: T[]) { }
// }

// export class OnLoadRepository<T extends ModelBase>  implements Action {
//     readonly type = EntityType.OnLoad;

//     constructor(public payload: T[]) { }
// }

// export type UserActionUnion<T extends ModelBase> = AddToRepository<T> | RemoveFromRepository<T> | UpdateRepository<T> | LoadRepository<T> | OnLoadRepository<T>;



// // import { Injectable } from '@angular/core'
// // import { Action } from '@ngrx/store'
// // //import { Tutorial } from './../models/tutorial.model'

// // export const ADD = 'Add'
// // export const REMOVE = 'Remove'
// // export const UPDATE = 'Update'

// // export class AddToRepository<T> implements Action {
// //     readonly type = ADD

// //     constructor(public payload: T) { }
// // }

// // export class RemoveFromRepository<T> implements Action {
// //     readonly type = REMOVE

// //     constructor(public payload: T) { }
// // }

// // export class UpdateRepository<T> implements Action {
// //     readonly type = UPDATE

// //     constructor(public payload: T) { }
// // }

// // export type Actions = AddToRepository<any> | RemoveFromRepository<any> | UpdateRepository<any>