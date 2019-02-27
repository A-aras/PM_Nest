import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import  { DatepickerModule,BsDatepickerModule,ModalModule} from 'ngx-bootstrap'

import { AppComponent } from './app.component';

import { IPmApiService } from './service/pm-api.service-interface';
import { PmApiService } from './service/pm-api.service';
import { UserDashboardComponent } from './ui//user/user-dashboard/user-dashboard.component';
import { ViewUserComponent } from './ui/user/view-user/view-user.component';
import { AddUserComponent } from './ui/user/add-user/add-user.component'
import { AppRoutingModule } from 'src/app/route/app.route.module';
import { SortPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ProjectDashboardComponent } from './ui/project/project-dashboard/project-dashboard.component';
import { AddProjectComponent } from './ui/project/add-project/add-project.component';
import { ViewProjectComponent } from './ui/project/view-project/view-project.component';
//import { SearchManagerComponent } from './ui/project/search-manager/search-manager.component';
import { ArrayLenghtPipe } from './pipes/arraylenght.pipe';
import { ViewTaskComponent } from './ui/task/view-task/view-task.component';
import { AddTaskComponent } from './ui/task/add-task/add-task.component';
import { SearchModuleComponent } from './ui/search/search-module/search-module.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './service/pm-notification.service';
import { StoreModule,Store } from '@ngrx/store';
import { UserReducer, UserRepositoryLoadEffect, UserState, reducers } from './repository/user/user.reducer';
import { OnLoadRepository } from './repository/user/user.action';
import { EffectsModule } from '@ngrx/effects';
import {  StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { Store } from '@angular/core/src/render3/instructions';



 
// export function PreLoadRepository(store:Store<UserState>) {
//   console.warn(store);
//   return () => store.dispatch(new OnLoadRepository(null));
// }

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    ViewUserComponent,
    AddUserComponent,
    SortPipe,
    FilterPipe,
    ProjectDashboardComponent,
    AddProjectComponent,
    ViewProjectComponent,
    //SearchManagerComponent,
    ArrayLenghtPipe,
    ViewTaskComponent,
    AddTaskComponent,
    SearchModuleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserRepositoryLoadEffect]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [{provide: IPmApiService,useClass:PmApiService},
    {provide: InjectableRxStompConfig,useValue: myRxStompConfig},
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    //{provide:APP_INITIALIZER,useFactory:PreLoadRepository,deps:[Store],multi:false}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
