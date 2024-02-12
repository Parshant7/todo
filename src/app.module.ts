import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), TaskModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
