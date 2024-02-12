import { IsEnum } from "class-validator";
import { Status } from "../enums/status.enum";

export class updateStatusDto{
    @IsEnum(Status)
    status: Status;
}