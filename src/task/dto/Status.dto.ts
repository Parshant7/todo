import { IsEnum } from "class-validator";
import { Status } from "../enums/status.enum";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class StatusDto{
    @ApiProperty()
    @IsEnum(Status)
    status: Status;
}

export class SearchStatusDto extends PartialType(StatusDto){}