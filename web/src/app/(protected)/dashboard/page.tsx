// src/app/(protected)/dashboard/page.tsx

import { JSX } from 'react';
import { WorkflowsLayout } from '@/modules/workflow/components/workflows-layout/WorkflowsLayout';

export default function Page(): JSX.Element {
  return (
    <div className='px-10'>
      <WorkflowsLayout />
    </div>
  );
}
