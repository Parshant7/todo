import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { TaskModel } from './model/task.model';
import { AddTaskDto } from './dto/addTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { Status } from './enums/status.enum';
import { SearchStatusDto, StatusDto } from './dto/Status.dto';
import { SortBy } from './enums/sort.enum';

@Injectable()
export class TaskService {
  constructor(@InjectModel('tasks') private readonly Task: Model<TaskModel>) {}

  async addTask(body: AddTaskDto): Promise<TaskModel> {
    const newTask = await this.Task.create(body);
    return newTask;
  }

  async getTask(id?: string, query?: SearchStatusDto): Promise<TaskModel[] | TaskModel> {

    console.log(id, query);
    if (id && id!==null ) {
      return this.findTask(id);
    }

    if(query?.status){
        const tasks = await this.Task.find({status: query.status});
        return tasks;
    }

    const tasks = await this.Task.find();
    return tasks;
  }

  async getTaskById(id: string): Promise<TaskModel[] | TaskModel> {
    return await this.findTask(id);
  }

  async getTasks(query?: SearchStatusDto): Promise<TaskModel[] | TaskModel> {

    const filter:any = {};
    let sortOrder: any = {
      date: -1
    }
    
    if(query?.status){
      filter.status = query.status;
    }
    if(query.sortBy === SortBy.Newest){
      sortOrder = {createdAt: -1};
    }
    if(query.sortBy === SortBy.Oldest){
      sortOrder = {createdAt: 1};
    }

    const tasks = await this.Task.find(filter).sort(sortOrder);
    return tasks;
  }

  async editTask(id: string, updates: EditTaskDto): Promise<TaskModel> {
    const task = await this.findTask(id);
    if(task.isDeleted){
      throw new HttpException("task is deleted, first you need to recover it", HttpStatus.BAD_REQUEST)
    }
    console.log('these are the updates ', updates);
    const updatedTask = await this.Task.findByIdAndUpdate(task._id, updates, {
      new: true,
    });
    return updatedTask;
  }

  async updateStatus(id: string, body: StatusDto): Promise<TaskModel> {
    const task = await this.findTask(id);
    if(task.isDeleted){
      throw new HttpException("task is deleted, first you need to recover it", HttpStatus.BAD_REQUEST)
    }
    console.log('status to update', body);
    const updatedTask = await this.Task.findByIdAndUpdate(
      task._id,
      {
        status: body.status,
      },
      {
        new: true,
      },
    );
    return updatedTask;
  }

  async deleteTask(id: string): Promise<TaskModel> {
    const task = await this.findTask(id);
    if(task.isDeleted){
      throw new HttpException("already in the desired state", HttpStatus.BAD_REQUEST)
    }
    const deletedTask = await this.Task.findByIdAndUpdate(
      task._id,
      {
        isDeleted: true,
      },
      {
        new: true
      }
    );
    return deletedTask;
  }

  async recoverTask(id: string): Promise<TaskModel> {
    const task = await this.findTask(id);
    if(!task.isDeleted){
      throw new HttpException("already in the desired state", HttpStatus.BAD_REQUEST)
    }
    const deletedTask = await this.Task.findByIdAndUpdate(
      task._id,
      {
        isDeleted: false,
      },
      {
        new: true
      }
    );
    return deletedTask;
  }

  async findTask(id: string) {
    if (isValidObjectId(id)) {
      //validating object id
      const task = await this.Task.findById(id);
      if (task) return task;
      else {
        throw new HttpException(
          'No task found with this id',
          HttpStatus.NOT_FOUND,
        );
      }
    } else throw new BadRequestException('Invalid Id');
  }
}
