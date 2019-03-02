// import { Injectable, Injector } from '@angular/core'
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { UserModel } from './../../model/user-model'
// //import { UserActions, AddToRepository, ADD, LoadRepository, UpdateRepository, RemoveFromRepository, UserActionUnion } from '../user/user.action';
// import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';

// //import { stat } from 'fs';
// import * as UserActions from '../user/user.action';

// import { EMPTY } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';
// import { PmApiService } from 'src/app/service/pm-api.service';
// import { IPmApiService } from 'src/app/service/pm-api.service-interface';
// import {
//     ActionReducerMap, createSelector,
//     createFeatureSelector
// } from '@ngrx/store';
// import { forEach } from '@angular/router/src/utils/collection';
// import { ModelBase } from 'src/app/model/model.base';


// export interface RepositoryState<T extends ModelBase> extends EntityState<T> {
//     loaded: boolean;
// }

// export function selectId<T extends ModelBase>(a: T): number|string {
//     //In this case this would be optional since primary key is id
//     return a.Indentifier(a);
// }

// // export function sortByName<T extends ModelBase>(a: T, b: T): number {
// //     return a.FirstName.localeCompare(b.FirstName);
// // }

// type entityAdapterType = <T extends ModelBase>() => EntityAdapter<T>;

// export const entityAdapter:entityAdapterType=<T extends ModelBase>()=>createEntityAdapter<T>({
//     selectId:x=>x.UniqueueIndentifier,
// });

// type repositoryInitialStateType = <T extends ModelBase>() => RepositoryState<T>;

// export const initialRepositoryState: repositoryInitialStateType=<T extends ModelBase>(adapter1:entityAdapterType)=>{
//     let a=adapter1;
// };

// // = userEntityAdapter.getInitialState({
// //     // additional entity state properties
// //     EntityCollection: [],
// //     loaded: false,
// //     Ids: []
// // });

// // export const initialState: RepositoryState<T> = userEntityAdapter.getInitialState({
// //     // additional entity state properties
// //     EntityCollection: [],
// //     loaded: false,
// //     Ids: []
// // });

// export function UserReducer<T extends ModelBase>(state: RepositoryState<T> = initialState, action: UserActions.UserActionUnion): RepositoryState<T> {
//     // Section 3
//     switch (action.type) {
//         case UserActions.UserActionTypes.Loaded:
//             return {
//                 ...entityAdapter.addMany(action.payload, state),
//                 loaded: true
//             };
//         case UserActions.UserActionTypes.Add:
//             return {
//                 ...userEntityAdapter.addOne(action.payload, state)
//             };
//         case UserActions.UserActionTypes.Update:
//             return {
//                 ...userEntityAdapter.updateOne({ id: action.payload.UserId, changes: action.payload }, state)
//             };
//         case UserActions.UserActionTypes.Remove:
//             return {
//                 ...userEntityAdapter.removeOne(action.payload.UserId, state)
//             };
//         default:
//             return state;
//     }
// }

// @Injectable()
// export class UserRepositoryLoadEffect {

//     constructor(
//         private actions$: Actions,
//         //private pmapiService: PmApiService
//         private injector: Injector
//     ) { }

//     @Effect()
//     loadUser$ = this.actions$
//         .pipe(
//             ofType(UserActions.UserActionTypes.OnLoad),
//             mergeMap(() => {
//                 let pmapiService = this.injector.get(IPmApiService);
//                 return pmapiService.getUsers()
//                     .pipe(map(users => {
//                         return ({ type: UserActions.UserActionTypes.Loaded, payload: users })
//                     }
//                     ),
//                         catchError(() => EMPTY)
//                     )
//             })
//         );

// }


// export interface StateData {
//     Data: UserState;
// }

// export const reducers: ActionReducerMap<StateData> = {
//     Data: UserReducer
// }

// // get the selectors
// const {
//     selectIds,
//     selectEntities,
//     selectAll: selectAllUsers,
//     selectTotal,
// } = userEntityAdapter.getSelectors();

// // select the array of users


// // export const selectAllUsers = createSelector(
// //     selectUserState,
// //     fromUser.selectAllUsers
// //   );

// export const selectUserState = createFeatureSelector<UserState>('Data');

// export const selectAllUserSelector = createSelector(
//     selectUserState,
//     selectAllUsers
// );


// export const getUserById = createSelector(
//     selectUserState,
//     (selectAllUsers: UserState, props) => {
        
//        let users = (selectAllUsers.ids as any[])
//        .filter((a, b, c) => {
//              return a === props.Id
//         })
//         .map((a, b, c) => {
//             return selectAllUsers.entities[a];
//         });

//         return users;
//     }
// );

// //   export const getUserById = createSelector(selectUserState,
// //     (id:number)=>{
// //         return selectAllUsers(selectUserState).filter(x=>x.UserId===id);
// //   })
