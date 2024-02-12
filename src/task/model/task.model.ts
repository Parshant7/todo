import * as mongoose from "mongoose";
import { Status } from "../enums/status.enum";

export class TaskModel{
    _id?: mongoose.Schema.Types.ObjectId;
    taskName?: string;
    description?: string;
    date?: Date;
    Status?: Status
}