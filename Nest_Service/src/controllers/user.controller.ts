import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserModel } from '../entity/user.model';
import { ServiceMockData } from '../mock/mock.data';
import { UserService } from '../user/user.service';
import { NotificationService } from '../events/notification.service';


@Controller('User')
export class UserController {

    constructor(private service: UserService, private notificationService: NotificationService) { }
    @Get()
    GetUsers(): Promise<UserModel[]> {

        //this.notificationService.broadcast("Subscribe", { event: "Subscribe", data: "test" });

        var a = this.service.GetUsers();
        a.catch(function (x) {
            console.log(x);
        })
        return a;
    }

    @Get('GetUserById/:id')
    GetUserById(@Param("id") id: number): Promise<UserModel[]> {

        //this.notificationService.broadcast("Subscribe", { event: "Subscribe", data: "test" });

        var a = this.service.GetUserById(id);
        a.catch(function (x) {
            console.log(x);
        })
        return a;
    }

    @Post('AddUser')
    AddUser(@Body() user: UserModel): Promise<UserModel> {
        return this.service.AddUser(user);
    }

    @Put('UpdateUser/:id')
    UpdateUser(@Param() id: number, @Body() user: UserModel): Promise<UserModel> {
        return this.service.UpdateUser(user);
    }

    @Delete('DeleteUser/:id')
    DeleteUser(@Param("id") id: number): Promise<UserModel> {
        // let numberId: number? =null;
        // if(id===undefined || id===undefined || id==="")
        // {
        //     return this.service.DeleteUser(id);
        // }
        return this.service.DeleteUser(+id);
    }
}