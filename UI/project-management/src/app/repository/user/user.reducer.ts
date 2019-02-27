import { Injectable, Injector } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserModel } from './../../model/user-model'
//import { UserActions, AddToRepository, ADD, LoadRepository, UpdateRepository, RemoveFromRepository, UserActionUnion } from '../user/user.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

//import { stat } from 'fs';
import * as UserActions from '../user/user.action';

import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PmApiService } from 'src/app/service/pm-api.service';
import { IPmApiService } from 'src/app/service/pm-api.service-interface';
import { ActionReducerMap ,createSelector,
    createFeatureSelector} from '@ngrx/store';



export interface UserState extends EntityState<UserModel> {
    EntityCollection: UserModel[];
    loaded: boolean;

}

export function selectUserId(a: UserModel): number {
    //In this case this would be optional since primary key is id
    return a.UserId;
}

export function sortByName(a: UserModel, b: UserModel): number {
    return a.FirstName.localeCompare(b.FirstName);
}

export const userAdapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>({
    selectId: x => x.UserId,
    sortComparer: sortByName,

});

export const initialState: UserState = userAdapter.getInitialState({
    // additional entity state properties
    EntityCollection: [],
    loaded: false,

});

export function UserReducer(state: UserState = initialState, action: UserActions.UserActionUnion): UserState {
    // Section 3
    switch (action.type) {
        case UserActions.UserActionTypes.Loaded:
            return {
                ...userAdapter.addMany(action.payload, state),
                loaded: true
            };
        case UserActions.UserActionTypes.Add:
            return {
                ...userAdapter.addOne(action.payload, state)
            };
        case UserActions.UserActionTypes.Update:
            return {
                ...userAdapter.updateOne({ id: action.payload.UserId, changes: action.payload }, state)
            };
        case UserActions.UserActionTypes.Remove:
            return {
                ...userAdapter.removeOne(action.payload.UserId, state)
            };
        default:
            return state;
    }
}

@Injectable()
export class UserRepositoryLoadEffect {

    constructor(
        private actions$: Actions,
        //private pmapiService: PmApiService
        private injector: Injector
    ) { }

    @Effect()
    loadUser$ = this.actions$
        .pipe(
            ofType(UserActions.UserActionTypes.OnLoad),
            mergeMap(() => {
                let pmapiService = this.injector.get(IPmApiService);
                return pmapiService.getUsers()
                    .pipe(map(users => {
                        return ({ type: UserActions.UserActionTypes.Loaded, payload: users })
                    }
                    ),
                        catchError(() => EMPTY)
                    )
            })
        );

}


export interface StateData {
    Data: UserState;
} 

export const reducers: ActionReducerMap<StateData> = {
    Data: UserReducer
}

// get the selectors
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = userAdapter.getSelectors();

  // select the array of users
export const selectAllUsers = selectAll;

// export const selectAllUsers = createSelector(
//     selectUserState,
//     fromUser.selectAllUsers
//   );

export const selectUserState = createFeatureSelector<UserState>('Data');
 
export const selectAllUserSelector = createSelector(
    selectUserState,
    selectAllUsers
  );