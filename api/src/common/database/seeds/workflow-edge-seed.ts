// src/common/database/seeds/workflow-edge.seed.ts

import { WorkflowEdgeFactory } from "@/common/database/factories/workflow-edge.factory";
import { WorkflowEdge } from "@/modules/workflow-edge/entities/workflow-edge.entity";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";
import { NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";

export class WorkflowEdgeSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const workflowRepo = dataSource.getRepository(Workflow);
    const edgeRepo = dataSource.getRepository(WorkflowEdge);

    const workflows: Workflow[] = await workflowRepo.find({
      relations: {
        nodes: true,
      },
    });

    if (!workflows.length) {
      throw new NotFoundException(
        'No workflows found. Seed workflows and nodes first.',
      );
    }

    const edges: WorkflowEdge[] = [];

    for (const workflow of workflows) {
      if (!workflow.nodes?.length) continue;

      const workflowEdges = WorkflowEdgeFactory.createEdgesForWorkflow(
        workflow,
        workflow.nodes,
      );

      edges.push(...workflowEdges);
    }

    if (!edges.length) {
      console.warn('No workflow edges generated.');
      return;
    }

    await edgeRepo.save(edges);

    console.log(`✅ Seeded ${edges.length} workflow edges`);
  }
}