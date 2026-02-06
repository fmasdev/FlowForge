// src/common/database/factories/workflow-edge.factory.ts

import { WorkflowEdge } from "@/modules/workflow-edge/entities/workflow-edge.entity";
import { WorkflowEdgeType } from "@/modules/workflow-edge/enums/workflow-edge-type.enum";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { WorkflowNodeType } from "@/modules/workflow-node/enums/workflow-node-type.enum";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";

export class WorkflowEdgeFactory {
  static create(
    workflow: Workflow,
    source: WorkflowNode,
    target: WorkflowNode,
    label?: string,
    type: WorkflowEdgeType = WorkflowEdgeType.WORKFLOW,
  ): WorkflowEdge {
    if (target.type === WorkflowNodeType.HTTP) {
      throw new Error('HTTP node cannot be a target');
    }

    const edge = new WorkflowEdge();
    edge.workflow = workflow;
    edge.source = source;
    edge.target = target;
    edge.label = label;
    edge.type = type;

    return edge;
  }

  static createEdgesForWorkflow(
    workflow: Workflow,
    nodes: WorkflowNode[],
  ): WorkflowEdge[] {
    const edges: WorkflowEdge[] = [];

    const httpNode = nodes.find((node) => node.type === WorkflowNodeType.HTTP);
    const conditionNode = nodes.find(
      (node) => node.type === WorkflowNodeType.CONDITION,
  
    );
    const delayNode = nodes.find(
      (node) => node.type === WorkflowNodeType.DELAY,
    );
    const emailNode = nodes.find(
      (node) => node.type === WorkflowNodeType.EMAIL,
    );
    const scriptNode = nodes.find(
      (node) => node.type === WorkflowNodeType.SCRIPT,
    );

    if (!httpNode || !conditionNode || !delayNode || !scriptNode || !emailNode) {
      return edges;
    }

    // HTTP -> CONDITION
    edges.push(this.create(workflow, httpNode, conditionNode, WorkflowEdgeType.WORKFLOW));

    // CONDITION true -> DELAY
    edges.push(this.create(workflow, conditionNode, delayNode, WorkflowEdgeType.SUCCESS));

    // CONDITION false -> EMAIL
    edges.push(this.create(workflow, conditionNode, emailNode, WorkflowEdgeType.ERROR));

    // DELAY -> SCRIPT
    edges.push(this.create(workflow, delayNode, scriptNode, WorkflowEdgeType.WORKFLOW));

    return edges;
  }
}