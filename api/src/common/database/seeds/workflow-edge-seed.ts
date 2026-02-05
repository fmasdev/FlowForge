// src/common/database/seeds/workflow-edge.seed.ts

import { WorkflowEdgeFactory } from "@/common/database/factories/workflow-edge.factory";
import { WorkflowEdge } from "@/modules/workflow-edge/entities/workflow-edge.entity";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";
import { DataSource } from "typeorm";

export class WorkflowEdgeSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const workflowRepo = dataSource.getRepository(Workflow);
    const nodeRepo = dataSource.getRepository(WorkflowNode);
    const edgeRepo = dataSource.getRepository(WorkflowEdge);

    const workflows = await workflowRepo.find({
      relations: ['nodes'],
    });

    for (const workflow of workflows) {
      const nodes = await nodeRepo.find({
        where: { workflow: { id: workflow.id } },
      });

      const edges = WorkflowEdgeFactory.createEdgesForWorkflow(workflow, nodes);

      if (!edges.length) {
        console.warn(`⚠️ No edges created for workflow ${workflow.id}`);
        continue;
      }

      await edgeRepo.save(edges);
      console.log(
        `✅ Seeded ${edges.length} edges for workflow ${workflow.id}`,
      );
    }
  }
}