import { PartialType } from "@nestjs/swagger";
import { AddTaskDto } from "./addTask.dto";

export class EditTaskDto extends PartialType(AddTaskDto) {}