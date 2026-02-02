// src/modules/worlflow-node/dto/condition-node-config.dto.ts

import { IsInt, IsOptional, Min } from "class-validator";

export class DelayNodeConfigDto {
  @IsInt()
  @Min(1)
  durationMs!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  jitterMs?: number;
}
