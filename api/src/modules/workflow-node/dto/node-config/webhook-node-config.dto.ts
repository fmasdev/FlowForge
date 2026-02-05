// src/modules/workflow-node/dto/node-config/email-node-config.dto.ts

import { IsEnum, IsObject, IsOptional, IsString } from "class-validator";

export class WebhookNodeConfigDto {
  
  @IsString()
  uri!: string

  @IsEnum(['GET', 'POST', 'PUT', 'PATCH'])
  method!: 'GET' | 'POST' | 'PUT' | 'PATCH';
  
  @IsOptional()
  @IsObject()
  headers?: Record<string, string>

  @IsOptional()
  @IsObject()
  body?: Record<string, unknown>
}