import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './repository/user/user.reducer';
import { OnLoadRepository } from './repository/user/user.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-management';

  constructor(private store:Store<UserState>)
  {
this.store.dispatch(new OnLoadRepository(null));
  }
}

