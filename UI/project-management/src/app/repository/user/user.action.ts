import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { UserModel } from './../../model/user-model'

// export const ADD = 'User - Add'
// export const REMOVE = 'User - Remove'
// export const UPDATE = 'User - Update'
// export const LOAD = 'User - Load'

export enum UserActionTypes {
    Add = '[User] Add',
    Remove = '[User] Remove',
    Update = '[User] Update',
    OnLoad = '[User] OnLoad',
    Loaded='[User] Load'
  }

export class AddToRepository  implements Action {
    readonly type = UserActionTypes.Add;

    constructor(public payload: UserModel) { }
}

export class RemoveFromRepository implements Action {
    readonly type = UserActionTypes.Remove;

    constructor(public payload: UserModel) { }
}

export class UpdateRepository  implements Action {
    readonly type = UserActionTypes.Update;

    constructor(public payload: UserModel) { }
}

export class LoadRepository  implements Action {
    readonly type = UserActionTypes.Loaded;

    constructor(public payload: UserModel[]) { }
}

export class OnLoadRepository  implements Action {
    readonly type = UserActionTypes.OnLoad;

    constructor(public payload: UserModel[]) { }
}

export type UserActionUnion = AddToRepository | RemoveFromRepository | UpdateRepository | LoadRepository | OnLoadRepository;

