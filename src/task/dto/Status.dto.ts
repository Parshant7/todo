import { IsEnum, IsOptional } from "class-validator";
import { Status } from "../enums/status.enum";
import { ApiProperty, PartialType, ApiPropertyOptional } from "@nestjs/swagger";
import { SortBy } from "../enums/sort.enum";

export class StatusDto{
    @ApiProperty({description: 'status of the task' })
    @IsEnum(Status)
    status: Status;
}

export class SearchStatusDto extends PartialType(StatusDto){
    @ApiProperty()
    @ApiPropertyOptional({description: 'sort by' })
    @IsOptional()
    @IsEnum(SortBy)
    sortBy: SortBy;
}