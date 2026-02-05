// src/common/database/factories/workflow-node.factory.ts

import { DataSource, Repository } from "typeorm";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";
import { NotFoundException } from "@nestjs/common";
import { WorkflowNodeFactory } from "@/common/database/factories/workflow-node.factory";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";


export class WorkflowNodeSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const workflowRepo: Repository<Workflow> =
      dataSource.getRepository(Workflow);
    const nodeRepo: Repository<WorkflowNode> =
      dataSource.getRepository(WorkflowNode);

    const workflows = await workflowRepo.find();

    if (!workflows.length) {
      throw new NotFoundException('No workflows found. Seed workflows first.');
    }

    const nodes: WorkflowNode[] = [];

    for (const workflow of workflows) {
      const rd = Math.floor(Math.random() * (2 - 0 + 1) + 0);

      // Crée les nodes
      const httpNode = nodeRepo.create(
        WorkflowNodeFactory.createHttpNode(workflow),
      );
      const conditionNode = nodeRepo.create(
        WorkflowNodeFactory.createConditionNode(workflow),
      );
      const delayNode = nodeRepo.create(
        WorkflowNodeFactory.createDelayNode(workflow),
      );

      const emailNode = nodeRepo.create(
        WorkflowNodeFactory.createEmailNode(workflow),
      );
      
      httpNode.workflow = workflow;
      conditionNode.workflow = workflow;
      delayNode.workflow = workflow;
      emailNode.workflow = workflow;

      nodes.push(httpNode, conditionNode, delayNode);
    }

    await nodeRepo.save(nodes);
    console.log(`✅ Seeded ${nodes.length} workflow nodes.`);
  }
}