import { IsDate, IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AddTaskDto{

    @MinLength(1)
    @MaxLength(200)
    @IsString()
    taskName: string;

    @MinLength(1)
    @MaxLength(3000)
    @IsString()
    description: string;

    @IsDateString()
    date: Date;
}