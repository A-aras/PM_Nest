import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  //app.enableCors({origin:"http://localhost:4200",allowedHeaders:"GET,PUT,POST,DELETE",})
  await app.listen(3000);
  
  
  
}
bootstrap();
