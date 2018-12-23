import { Injectable } from '@nestjs/common';
import { UserModel } from '../entity/user.model';
import { ServiceMockData } from '../mock/mock.data';

@Injectable()
export class UserServiceMock {

    GetUsers():UserModel[]
    {
        return ServiceMockData.Users;
    }

    AddUser(user:UserModel):UserModel
    {
        var users:UserModel[]=[user];
        ServiceMockData.Users.concat(users);
        return user;
    }

    UpdateUser(user:UserModel):UserModel
    {
        var index=ServiceMockData.Users.indexOf(user);
        if( index!=-1)
        {
            ServiceMockData.Users[index]=user;
        }
        return user;
    }

    DeleteUser(id:number)
    {
        //var index=ServiceMockData.Users.findIndex(x=>x.UserId===id);
        ServiceMockData.Users=ServiceMockData.Users.filter(x=>x.UserId!=id);
        //return user;
    }
}
