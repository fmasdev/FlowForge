// src/app/(protected)/dashboard/page.tsx

import { JSX } from 'react';
import { WorkflowDashboard } from '@/modules/workflow/components/workflows/Workflows';

export default function Page(): JSX.Element {
  return (
    <div className='px-10'>
      <WorkflowDashboard />
    </div>
  );
}
