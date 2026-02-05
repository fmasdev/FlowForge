// src/modules/workflow-node/dto/action-node.dto.ts

import { IsEnum, IsString } from "class-validator";

export class ScriptNodeConfigDto {
  
  @IsEnum(['js', 'ts', 'php', 'python'])
  language!: 'js' | 'ts' | 'php' | 'python';

  @IsString()
  code!: string;
}

