// src/modules/workflow-node/dto/node-config/email-node-config.dto.ts

import { IsString } from "class-validator"

export class EmailNodeConfigDto {
  @IsString()
  to!: string
  
  @IsString()
  subject!: string

  @IsString()
  text!: string
}
