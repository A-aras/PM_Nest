import { EntityState } from '@ngrx/entity';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, switchMap } from 'rxjs/operators';
import { NotificationMessagModel } from 'src/app/model/message-model';
import { ModelBase } from 'src/app/model/model.base';
import { PmNotificationService } from "../../service/pm-notification.service";

export abstract class IRepositoryBase<T extends ModelBase>   {

    abstract loadRepository(): Action;

    abstract getAll(): Observable<T[]>;
    abstract getById(id: number | string): Observable<T[]>;

    abstract addToRepository(model: T);

    abstract updateRepository(model: T);

    abstract removeFromRepository(model: T);

    abstract fetchItems(): Observable<T[]>;

   abstract fetchItemsById(id: number | string): Observable<T[]>;

}


export abstract class RepositoryBase<T extends ModelBase, TState extends EntityState<T>> implements IRepositoryBase<T>
{
    constructor(public store: Store<TState>, private notification: PmNotificationService, private entityType: string) {

        this.store.dispatch(this.loadRepository());

        this.notification.WhenEvents().pipe(filter(x => {
            return x.entityType === this.entityType;
        }))

            .pipe(switchMap((msg: NotificationMessagModel) => {
                return this.fetchItemsById(msg.id)
                    .pipe(select(usrs => usrs.filter(usr => {
                        return usr.Indentifier() === msg.id.toString();
                    })))
                    .pipe(map(usr => {
                        if (msg.action === "Add") {
                            return this.addToRepository(usr[0]);
                        }
                        else if (msg.action === "Update") {
                            return this.updateRepository(usr[0]);
                        }
                        else if (msg.action === "Delete") {
                            return this.removeFromRepository(usr[0]);
                        }
                    }));

            })).subscribe(x => {
                this.store.dispatch(x);
            });

    }
    abstract getAll(): Observable<T[]>;
    abstract getById(id: number | string): Observable<T[]>;
    abstract loadRepository(): Action;

    abstract addToRepository(model: T);
    abstract updateRepository(model: T);
    abstract removeFromRepository(model: T);

    abstract fetchItems(): Observable<T[]>;

    abstract fetchItemsById(id: number | string): Observable<T[]>;
}
