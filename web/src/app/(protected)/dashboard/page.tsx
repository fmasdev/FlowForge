// src/app/(protected)/dashboard/page.tsx

import { WorkflowsLayout } from '@/modules/workflow/components/WorkflowsLayout';
import { JSX } from 'react';

export default function Page(): JSX.Element {
  return (
    <div className='px-10'>
      <WorkflowsLayout />
    </div>
  );
}
