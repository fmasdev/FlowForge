// src/modules/worlflow-node/dto/update-workflow-node.dto.ts

import { OmitType } from "@nestjs/mapped-types";
import { CreateWorkflowNodeDto } from "./create-workflow-node.dto";


export class UpdateWorkflowNodeDto extends OmitType(CreateWorkflowNodeDto, ['workflowId']) {}
