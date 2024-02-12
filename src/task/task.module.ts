import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './schemas/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'tasks', schema: taskSchema }])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
