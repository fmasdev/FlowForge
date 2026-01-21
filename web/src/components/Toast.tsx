// src/components/Toast.tsx

'use client';

import { JSX } from 'react';

interface ToastProps {}

export const toast = (props: ToastProps): JSX.Element => {
  console.log('toast');
  return <div>toast</div>;
};
