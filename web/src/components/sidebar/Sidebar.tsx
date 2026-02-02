// src/components/Sidebar.tsx

'use client';

import clsx from 'clsx';
import { JSX } from 'react';

export interface SidebarProps {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg';
}

const widthClasses: Record<NonNullable<SidebarProps['width']>, string> = {
  sm: 'w-64',
  md: 'w-80',
  lg: 'w-96',
};

export function Sidebar({
  children,
  title,
  footer,
  className,
  width = 'md',
}: SidebarProps): JSX.Element {
  return (
    <aside
      className={clsx(
        'flex h-full flex-col border-l border-white/10 bg-gray-900',
        widthClasses[width],
        className,
      )}
    >
      {title && (
        <header className="shrink-0 border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-200">
            {title}
          </h2>
        </header>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3 text-sm text-gray-300">
        {children}
      </div>

      {footer && (
        <footer className="shrink-0 border-t border-white/10 px-4 py-3">
          {footer}
        </footer>
      )}
    </aside>
  );
}
