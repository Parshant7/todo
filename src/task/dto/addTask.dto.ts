import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AddTaskDto{

    @ApiProperty({
        description: `Name of the task`,
        example: "todo task 1"
    })
    @MinLength(1)
    @MaxLength(200)
    @IsString()
    taskName: string;

    @ApiProperty({
        description: `Description of the task`,
        example: "This is about the task"
    })
    @MinLength(1)
    @MaxLength(3000)
    @IsString()
    description: string;


    @ApiProperty({
        description: `Date of the task`,
        example: "2024-02-12T00:00:00.000Z"
    })
    @ApiProperty()
    @IsDateString()
    date: Date;
}