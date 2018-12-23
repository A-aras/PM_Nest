import { Controller, Get,Post,Put,Delete,Body,Param } from '@nestjs/common';
import { UserModel } from '../entity/user.model';
import { ServiceMockData } from '../mock/mock.data';
import { UserService } from '../../dist/src/user/user.service';


@Controller('User')
export class UserController {

    constructor(private service:UserService){}
    @Get()
     GetUsers(): Promise<UserModel[]> {
        var a=  this.service.GetUsers();
a.catch(function(x){
    console.log(x);
})
        return a;

    }

    @Post()
    AddUser(@Body() user: UserModel): Promise<UserModel> {
        return this.service.AddUser(user);
    }

    @Put(':id')
    UpdateUser(@Param() id:number,@Body() user: UserModel): Promise<UserModel> {
        return this.service.UpdateUser(user);
    }

    @Delete(':id')
    DeleteUser(@Param() id:number):Promise<UserModel>{
        return this.service.DeleteUser(id);
    }
}