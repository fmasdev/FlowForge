// src/modules/workflow/dto/pagination.dto.ts

import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { SortDirection } from "@/common/enums/sortDirection.enum";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit = 20;

  @IsOptional()
  @IsString()
  @Type(() => String)
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection = SortDirection.DESC;

  @IsOptional()
  @IsString()
  search?: string;
}
