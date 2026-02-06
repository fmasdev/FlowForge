// src/app/(protected)/workflows/[id].tsx

import { WorkflowLayout } from "@/modules/workflow/components/workflow-layout/WorkflowLayout";
import { JSX } from "react";

export interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const { id } = await params;

  if (!id) {
    throw new Error('Workflow ID is required');
  }

  if (typeof id !== 'string') {
    throw new Error('Workflow ID must be a string');
  }

  return (
    <div className=" min-h-screen">
      <WorkflowLayout
        id={id}
      />
    </div>
  );
}