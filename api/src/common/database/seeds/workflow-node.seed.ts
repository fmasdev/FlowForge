// src/common/database/factories/workflow-node.factory.ts

import { DataSource } from "typeorm";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";
import { NotFoundException } from "@nestjs/common";
import { WorkflowNodeFactory } from "@/common/database/factories/workflow-node.factory";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";


export class WorkflowNodeSeeder {
  async run(dataSource: DataSource, count = 10): Promise<void> {
    const workflowRepo = dataSource.getRepository(Workflow);
    const nodeRepo = dataSource.getRepository(WorkflowNode);
    
    const workflows: Workflow[] = await workflowRepo.find();

    if (!workflows.length) {
      throw new NotFoundException('No workflows. Please seed workflows before workflow nodes.')
    }

    const nodes: WorkflowNode[] = [];

     for (const workflow of workflows) {
       nodes.push(
         nodeRepo.create(WorkflowNodeFactory.createHttpNode(workflow)),
         nodeRepo.create(
           WorkflowNodeFactory.createConditionNode(workflow),
         ),
         nodeRepo.create(WorkflowNodeFactory.createDelayNode(workflow)),
       );
     }

    await nodeRepo.save(nodes);
    console.log(`✅ Seeded ${nodes.length} workflow nodes`);
  }
}