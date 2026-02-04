// src/modules/workflow-node/dto/update-node-label.dto.ts

import { NodePatchType } from "@/modules/workflow-node/enums/node-patch-type.enum";
import { IsNumber, IsObject, IsString, ValidateIf } from "class-validator";

export class UpdateNodePositionDto {
  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;
}

export class UpdateNodeDto {

  @ValidateIf((o) => o.type === NodePatchType.POSITION)
  @IsObject()
  position?: UpdateNodePositionDto;

  @ValidateIf((o) => o.type === NodePatchType.LABEL)
  @IsString()
  label?: string;
}

