import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/websockets';
import { AmqpPushService } from './events/amqp.push.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  //app.enableCors({origin:"http://localhost:4200",allowedHeaders:"GET,PUT,POST,DELETE",})
  app.useWebSocketAdapter(new WsAdapter());
  //let a=app.get(AmqpPushService);
  await app.listen(3000);
  
  
  
}
bootstrap();
