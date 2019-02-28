import { Injectable, Catch, Logger } from '@nestjs/common';
import { UserModel } from '../entity/user.model';
import { getConnection, getRepository, Repository, getConnectionOptions, 
    createConnection, EntityManager, FindOperator, Equal, SimpleConsoleLogger } from 'typeorm'
    import { SaveOptions } from 'typeorm'
import { DatabaseService } from '../database.service';
import { filter } from 'rxjs/operators';
import { UserEntity } from '../entity/user.schema';
import { json } from 'body-parser';
import { promisify } from 'util';
import { strictEqual } from 'assert';
import { AmqpClient } from '../events/rabbit.mq.client';
import { AmqpPushService } from './../events/amqp.push.service';
import { MessageModel } from './../events/message.model';
//import { ServiceMockData } from '../mock/mock.data';
var amqp = require('amqplib');

@Injectable()
export class UserService {
    repo: Repository<UserModel>;
    constructor(private dbservice: DatabaseService,private notificationService:AmqpPushService) {

        // getConnectionOptions().then(x=>

        //     createConnection(x)).then(connection => {
        //         this.repo =connection.getRepository(UserModel);
        //         // here you can start to work with your entities
        //     }).catch(error => console.log(error));

        dbservice.connectionEstablished
            .pipe(filter((x) => {
                return x === true;
            }))
            .subscribe(x => {

                var repo = dbservice.dbConnection.getRepository(UserEntity)
                this.repo = repo;
            });

    }
    GetUsers(): Promise<UserModel[]> {
        return this.repo.find({relations:["Projects"]}).then(x => {
            return x;
        });
        //return ServiceMockData.Users;
    }

    AddUser(user: UserModel): Promise<UserModel> {
       
        return this.repo.save(user).then(x=>{
            let msg=this.GetUserMessage('Add',x.UserId);
            this.publisMessage(msg);
            return x;
        });
    }

    GetUserMessage(action:string,userId:number|null):MessageModel
    {
        let msg=new MessageModel();
        msg.action=action;
        msg.entityType="User";
        msg.id=userId;
        return msg;
    }

    UpdateUser(user: UserModel): Promise<UserModel> {

       
        let msg=this.GetUserMessage('Update',user.UserId);
        
        
        //this.messageClient.publishMessage("/exchange/PMTest","Test Message");
        // options:SaveOptions={

        // };
        return this.repo.save(user).then(x=>{
            this.publisMessage(msg);
            return x;
        })
        .catch(x=>{
            console.log('Error');
            return null;
        });
       
    }



    public publisMessage(msg:MessageModel){
        
       var stingMessage=JSON.stringify(msg);

        this.notificationService.publishMessage('PMTest','test',stingMessage);
//         amqp.connect('amqp://localhost:5672').then(function(conn) {
//   return conn.createChannel().then(function(ch) {
//     var ex = 'PMTest';
//     var ok = ch.assertExchange(ex, 'topic', {durable: true})

//     var message = 'Hello World!';

//     return ok.then(function() {
//       ch.publish(ex, 'test', Buffer.from(message));
//       console.log(" [x] Sent '%s'", message);
//       return ch.close();
//     });
//   }).finally(function() { conn.close(); });
// }).catch(console.warn);

        
    }

    DeleteUser(id: number): Promise<UserModel> {

        //return this.repo.delete(id).then(x=>null);
        
            // return this.dbservice.dbConnection.createQueryBuilder()
            //     .delete()
            //     .from(UserModel)
            //     .where('UserId = :id', {id: id})
            //     .execute().then(a=>null);
            

        
        // return  this.repo.findOne(id).then(x=>{
        //     return this.dbservice.dbConnection.createQueryBuilder()
        //         .delete()
        //         .from(UserModel)
        //         .where('UserId = :id', {id: id})
        //         .execute().then(a=>x);
        //     //return x;
        // }).then(x=>x);


        // await this.repo.createQueryBuilder()
        //         .delete()
        //         .from(UserModel)
        //         .where('UserId = :id', {id: id})
        //         .execute();

        // let user = this.repo.findOne(id);
        // this.repo.delete(id);
        // return user;

        console.log(id);

        //  let numberId: number = null;
        // if(id!=undefined && id!=undefined || id!="")
        // {
        //     numberId=parseInt(id);
        //     //return this.service.DeleteUser(id);
        // }

       

        return this.repo.findOne({relations:["Projects"],where:{UserId:Equal(id)}}).then(x=>{
            if (x===null|| x===undefined)
            {
                console.log("Find Returns null" );
            return null;
        }
            else 
            {
                // var users=x.filter(y=>{
                //     return y.UserId === id;
                // });
                // var user=users[0];
                 var user=x;
                console.log("Find Returns value => " + JSON.stringify(user) );
            return user;
            }
        }).then(x=>{
            
            return this.repo.remove(x).then(y=>{
                let msg=this.GetUserMessage('Delete',y.UserId);
                this.publisMessage(msg);
                return y;
            }).catch(y=>{
                console.log("Error occurd");
                return null;
            });
            //return Promise.resolve(this.repo.delete({UserId:x.UserId}).then(y=>x));
        }).then(x=>{
                if (x===null|| x===undefined)
            return null;
            else 
            return x;
        });
        
        //return this.repo.find({where:{UserId:id}})
        // return this.repo.findByIds([id])
        // .then(x=>{
        //     console.log("Find Output"+ JSON.stringify(x) );
        //     x.forEach(item=>{
        //         console.log("Item Output"+ JSON.stringify(item) );
        //     });
        //     //for(var index=0:index<=x.)
            
        //     this.repo.delete({UserId:id}).then(y=>{
        //         console.log("Delete output"+ JSON.stringify(y));
        //         return x;});
        // })
        // .then(x=> {

        //     console.log("Final output"+ JSON.stringify(x));
        //      //JSON.stringify(x)

        //     if (x===null|| x===undefined)
        //     return null;
        //     else 
        //     return x[0];
        // }
        //     );

            
        

         

         //return user.then(x=>x[0]); 

        // return this.repo.findOne(id).then(x=>{
        //     return this.repo.delete()
        //  });

    }
}
