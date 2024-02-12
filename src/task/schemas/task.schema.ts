import { Schema } from "mongoose";
import { Status } from "../enums/status.enum";

export const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: Status,
        default: Status.InProgress
    }
})