import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from 'url';
import { HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { UserModel } from './../../model/user-model'
import { OnLoadRepository,AddUserToRepository,UpdateRepository,RemoveFromRepository, UserActionUnion } from './../user/user.action'

// import { TaskModel } from './../model/task-model';
// import { ProjectModel } from '../model/project-model';
// import { UserModel } from '../model/user-model';
// import { IPmApiService } from './pm-api.service-interface';
import { Store,select, Action } from '@ngrx/store';
import { UserState, getUserById } from './user.reducer';
import { IPmApiService } from './../../service/pm-api.service-interface';
// import { IPmApiService } from './../../service/pm-api.service-interface';
import { selectAllUserSelector } from "src/app/repository/user/user.reducer";
import { PmNotificationService } from "../../service/pm-notification.service";
import { filter, switchMap, switchMapTo, first, map, single } from 'rxjs/operators';
import { NotificationMessagModel } from 'src/app/model/message-model';
import { IRepositoryBase, RepositoryBase } from '../repositorybase/repository.base';

export abstract class IUserRepository extends IRepositoryBase<UserModel> {

     abstract getAllUsers():Observable<UserModel[]>;
     abstract getUserById(id:number):Observable<UserModel[]>;
    
  }

@Injectable()
export class UserRepository extends RepositoryBase<UserModel,UserState> implements IUserRepository
{
    constructor(store:Store<UserState>,private apiservice:IPmApiService,notification:PmNotificationService)
    {
        super(store,notification,"User");
    }

    getAll(): Observable<UserModel[]> {
        return this.store.pipe(select(selectAllUserSelector));
    }
    getById(id:number): Observable<UserModel[]> {
        return this.store.pipe(
            select(getUserById,{Id:id})
            );
    }
    addToRepository(model: UserModel) {
        return new AddUserToRepository(model); 
    }
    updateRepository(model: UserModel) {
        return new UpdateRepository(model); 
    }
    removeFromRepository(model: UserModel) {
        return new RemoveFromRepository(model); 
    }
    fetchItems(): Observable<UserModel[]> {
        return this.apiservice.getUsers();
    }

    fetchItemsById(id: number): Observable<UserModel[]>
    {
        return this.apiservice.getUsersById(id);
    }

    loadRepository(): Action
    {
        return new OnLoadRepository(null);
    }

    // constructor(private store:Store<UserState>,private apiservice:IPmApiService,private notification:PmNotificationService)
    // {
    //     this.store.dispatch(new OnLoadRepository(null));

    //       this.notification.WhenEvents().pipe(filter(x=>{
    //           return x.entityType==='User';
    //       }))

    //       .pipe(switchMap((msg:NotificationMessagModel)=>{
    //           return this.apiservice.getUsers().pipe(select(usrs=> usrs.filter(usr=>usr.UserId===msg.id))).pipe(map(usr=>{
    //             if(msg.action==="Add")
    //             {
    //                 return new AddUserToRepository(usr[0]);  
    //             }
    //             else   if(msg.action==="Update")
    //             {
    //                 return new UpdateRepository(usr[0]);  
    //             }
    //             else   if(msg.action==="Delete")
    //             {
    //                 return new RemoveFromRepository(usr[0]);  
    //             }

    //           }));
    //         //    if(msg.action==="Add")
    //         //    {
    //         //     return this.apiservice.getUsers().pipe(select(usrs=> usrs.filter(usr=>usr.UserId===msg.id)))
    //         //     .pipe(map(usr=>{
    //         //         return new AddToRepository(usr[0]);
    //         //     }))
    //         //    }
    //         //return new AddToRepository(null);
    //       })).subscribe(x=>{
    //         this.store.dispatch(x);
    //       });
    //     // notification.WhenEvents().pipe(filter(x=>x.entityType==='User'))
    //     // .pipe(switchMap((msg : NotificationMessagModel) =>{
    //     //     let userAction:any;
    //     //     // if(x.action==="Add")
    //     //     // {
    //     //     //     return this.apiservice.getUsers().pipe(filter(usr=>{
    //     //     //         usr.
    //     //     //     }))
    //     //     //     userAction=new AddToRepository()
    //     //     //     this.store.dispatch(new OnLoadRepository(null));
    //     //     // }
    //     //     // else if(x.action==="Delete")
    //     //     // {

    //     //     // }
    //     //     // else if(x.action==="Update")
    //     //     // {

    //     //     // }
    //     //     return userAction as UserActionUnion;
    //     // }))
    //     // .subscribe(x=>{
    //     //     this.store.dispatch(x);
            
    //     // });
    // }
    getAllUsers(): Observable<UserModel[]> {
       return this.getAll();
    }  
      getUserById(id:number): Observable<UserModel[]> {
        return this.getById(id);
    }
}




//Old Code


// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/internal/Observable';
// import { HttpClient } from '@angular/common/http';
// import { of } from 'rxjs';
// import { HttpHeaders } from '@angular/common/http';
// import { URLSearchParams } from 'url';
// import { HttpParams } from '@angular/common/http';
// import {environment} from 'src/environments/environment';
// import { UserModel } from './../../model/user-model'
// import { OnLoadRepository,AddUserToRepository,UpdateRepository,RemoveFromRepository, UserActionUnion } from './../user/user.action'

// // import { TaskModel } from './../model/task-model';
// // import { ProjectModel } from '../model/project-model';
// // import { UserModel } from '../model/user-model';
// // import { IPmApiService } from './pm-api.service-interface';
// import { Store,select } from '@ngrx/store';
// import { UserState, getUserById } from './user.reducer';
// import { IPmApiService } from './../../service/pm-api.service-interface';
// // import { IPmApiService } from './../../service/pm-api.service-interface';
// import { selectAllUserSelector } from "src/app/repository/user/user.reducer";
// import { PmNotificationService } from "../../service/pm-notification.service";
// import { filter, switchMap, switchMapTo, first, map, single } from 'rxjs/operators';
// import { NotificationMessagModel } from 'src/app/model/message-model';

// export abstract class IUserRepository {

//     abstract getAllUsers():Observable<UserModel[]>;
//     abstract getUserById(id:number):Observable<UserModel[]>;
    
//   }

// @Injectable()
// export class UserRepository implements IUserRepository
// {
//     constructor(private store:Store<UserState>,private apiservice:IPmApiService,private notification:PmNotificationService)
//     {
//         this.store.dispatch(new OnLoadRepository(null));

//           this.notification.WhenEvents().pipe(filter(x=>{
//               return x.entityType==='User';
//           }))

//           .pipe(switchMap((msg:NotificationMessagModel)=>{
//               return this.apiservice.getUsers().pipe(select(usrs=> usrs.filter(usr=>usr.UserId===msg.id))).pipe(map(usr=>{
//                 if(msg.action==="Add")
//                 {
//                     return new AddUserToRepository(usr[0]);  
//                 }
//                 else   if(msg.action==="Update")
//                 {
//                     return new UpdateRepository(usr[0]);  
//                 }
//                 else   if(msg.action==="Delete")
//                 {
//                     return new RemoveFromRepository(usr[0]);  
//                 }

//               }));
//             //    if(msg.action==="Add")
//             //    {
//             //     return this.apiservice.getUsers().pipe(select(usrs=> usrs.filter(usr=>usr.UserId===msg.id)))
//             //     .pipe(map(usr=>{
//             //         return new AddToRepository(usr[0]);
//             //     }))
//             //    }
//             //return new AddToRepository(null);
//           })).subscribe(x=>{
//             this.store.dispatch(x);
//           });
//         // notification.WhenEvents().pipe(filter(x=>x.entityType==='User'))
//         // .pipe(switchMap((msg : NotificationMessagModel) =>{
//         //     let userAction:any;
//         //     // if(x.action==="Add")
//         //     // {
//         //     //     return this.apiservice.getUsers().pipe(filter(usr=>{
//         //     //         usr.
//         //     //     }))
//         //     //     userAction=new AddToRepository()
//         //     //     this.store.dispatch(new OnLoadRepository(null));
//         //     // }
//         //     // else if(x.action==="Delete")
//         //     // {

//         //     // }
//         //     // else if(x.action==="Update")
//         //     // {

//         //     // }
//         //     return userAction as UserActionUnion;
//         // }))
//         // .subscribe(x=>{
//         //     this.store.dispatch(x);
            
//         // });
//     }
//     getAllUsers(): Observable<UserModel[]> {
//        return this.store.pipe(select(selectAllUserSelector));
//     }  
//       getUserById(id:number): Observable<UserModel[]> {
//         return this.store.pipe(
//             select(getUserById,{Id:id})
            
//             );
//     }
// }
