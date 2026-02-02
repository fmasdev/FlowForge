// src/modules/worlflow-node/dto/http-node-config.dto.ts

import { IsEnum, IsObject, IsOptional, IsUrl } from "class-validator";

export class HttpNodeConfigDto {
  
  @IsUrl()
  url!: string;
  
  @IsEnum(['GET', 'POST', 'PUT', 'DELETE'])
  method!: string;
  
  @IsOptional()
  @IsObject()
  headers!: Record<string, string>;

  @IsOptional()
  @IsObject()
  body!: string;
}

