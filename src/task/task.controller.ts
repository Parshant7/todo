import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddTaskDto } from './dto/addTask.dto';
import { TaskService } from './task.service';
import { TaskModel } from './model/task.model';
import { EditTaskDto } from './dto/editTask.dto';
import { updateStatusDto } from './dto/updateStatus.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id?') 
  async getTask(@Param('id') id?: string): Promise<TaskModel | TaskModel[]> {
    return this.taskService.getTask(id);
  }

  @Post()
  async addTask(@Body() body: AddTaskDto): Promise<TaskModel> {
    return this.taskService.addTask(body);
  }
	
  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: EditTaskDto,
  ): Promise<TaskModel> {
    return this.taskService.editTask(id, body);
  }

  @Patch('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: updateStatusDto,
  ): Promise<TaskModel> {
    return this.taskService.updateStatus(id, body);
  }
}
