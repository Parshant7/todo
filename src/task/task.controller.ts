import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AddTaskDto } from './dto/addTask.dto';
import { TaskService } from './task.service';
import { TaskModel } from './model/task.model';
import { EditTaskDto } from './dto/editTask.dto';
import { StatusDto, SearchStatusDto } from './dto/Status.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @Get() //get all tasks/ by status
  async getTasks(@Query() payload?: SearchStatusDto): Promise<TaskModel | TaskModel[]> {
    return this.taskService.getTasks(payload);
  }
  
  @Get(':id')  //get task by id
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'id of the task',
		required: false
	})
	  async getTaskById(@Param('id') id: string): Promise<TaskModel | TaskModel[]> {
    return this.taskService.getTaskById(id);
  }

  @Post() // create new task
	@ApiBody({ type: AddTaskDto })
  async addTask(@Body() body: AddTaskDto): Promise<TaskModel> {
    return this.taskService.addTask(body);
  }

  @Patch(':id') //update task
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'id of the task',
	})
	@ApiBody({type: EditTaskDto})
  async updateTask( 
    @Param('id') id: string,
    @Body() body: EditTaskDto,
  ): Promise<TaskModel> {
    return this.taskService.editTask(id, body);
  }

	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'id of the task',
		required: false
	})
  @Patch('status/:id')
  async updateStatus( //update status of the task
    @Param('id') id: string,
    @Body() body: StatusDto,
  ): Promise<TaskModel> {
    return this.taskService.updateStatus(id, body);
  }
}
