import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AddTaskDto } from './dto/addTask.dto';
import { TaskService } from './task.service';
import { TaskModel } from './model/task.model';
import { EditTaskDto } from './dto/editTask.dto';
import { StatusDto, SearchStatusDto } from './dto/Status.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get() //get all tasks/ by status
  @ApiTags('get tasks by status | order')
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
  @ApiTags('get tasks by id')
	  async getTaskById(@Param('id') id: string): Promise<TaskModel | TaskModel[]> {
    return this.taskService.getTaskById(id);
  }

  @Post() // create new task
	@ApiBody({ type: AddTaskDto })
  @ApiTags('Add new Task')
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
  @ApiTags('Update Task')
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
  @ApiTags('update Status')
  async updateStatus( //update status of the task
    @Param('id') id: string,
    @Body() body: StatusDto,
  ): Promise<TaskModel> {
    return this.taskService.updateStatus(id, body);
  }

  @ApiParam({
		name: 'id',
		type: 'string',
		description: 'id of the task',
		required: false
	})
	@Delete(":id")
  @ApiTags('Delete task')
  async deleteTask( //update status of the task
    @Param('id') id: string,
  ): Promise<TaskModel> {
    return this.taskService.deleteTask(id);
  }

  @ApiParam({
		name: 'id',
		type: 'string',
		description: 'id of the task',
		required: false
	})
  @Patch("recover/:id")
  @ApiTags('Recover task')
  async recoverTask( //update status of the task
    @Param('id') id: string,
  ): Promise<TaskModel> {
    return this.taskService.recoverTask(id);
  }

}
