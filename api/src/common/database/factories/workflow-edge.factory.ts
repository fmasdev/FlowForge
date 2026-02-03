// src/common/database/factories/workflow-edge.factory.ts

import { WorkflowEdge } from "@/modules/workflow-edge/entities/workflow-edge.entity";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { WorkflowNodeType } from "@/modules/workflow-node/enums/workflow-node-type.enum";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";

export class WorkflowEdgeFactory {
  static create(
    workflow: Workflow,
    source: WorkflowNode,
    target: WorkflowNode,
    label?: string,
  ): WorkflowEdge {
    const edge = new WorkflowEdge();
    edge.workflow = workflow;
    edge.source = source;
    edge.target = target;
    edge.label = label;

    return edge;
  }

  static createEdgesForWorkflow(
    workflow: Workflow,
    nodes: WorkflowNode[],
  ): WorkflowEdge[] {
    const edges: WorkflowEdge[] = [];

    const httpNode = nodes.find(n => n.type === WorkflowNodeType.HTTP);
    const conditionNode = nodes.find(n => n.type === WorkflowNodeType.CONDITION);
    const delayNode = nodes.find(n => n.type === WorkflowNodeType.DELAY);

    if (!httpNode || !conditionNode || !delayNode) {
      return edges;
    }

    // HTTP -> CONDITION
    edges.push(this.create(workflow, httpNode, conditionNode, 'next'));

    // CONDITION true -> DELAY
    edges.push(this.create(workflow, conditionNode, delayNode, 'true'));
    
    // CONDITION false → HTTP (simple loop )
    edges.push(this.create(workflow, conditionNode, httpNode, 'false'));

    // DELAY -> HTTP
    edges.push(this.create(workflow, delayNode, httpNode, 'next'));

    return edges;
  }
  
}