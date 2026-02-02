// src/app/(protected)/dashboard/page.tsx

import { JSX } from 'react';
import { WorkflowDashboard } from '@/modules/workflow/components/workflow/Workflow';

export default function Page(): JSX.Element {
  return (
    <div className='px-10'>
      <WorkflowDashboard />
    </div>
  );
}
