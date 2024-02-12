import { PartialType } from "@nestjs/mapped-types";
import { AddTaskDto } from "./addTask.dto";

export class EditTaskDto extends PartialType(AddTaskDto) {}