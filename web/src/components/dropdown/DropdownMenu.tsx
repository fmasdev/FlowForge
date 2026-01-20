// src/components/dropdown/DropdownMenu.tsx

'use client';

import { CtaButton } from '@/components/CtaButton';
import { IconName } from '@/components/SvgIcon';
import { JSX, useEffect, useRef, useState } from 'react';

export interface MenuItem {
  label: string;
  link?: string;
  iconName?: IconName;
  isActive: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  menuItems: MenuItem[];
  label?: string;
  iconName?: IconName;
}

export interface DropDownMenuType extends DropdownMenuProps {}

export const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // auto close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      {/* cta */}
      <CtaButton
        icon={props.iconName}
        isBtn={false}
        onClick={() => setOpen(v => !v)}
        color="ternary"
        hoverClass="hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium text-gray-300"
      />
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition"
        >
          {props.menuItems.map((menuItem, index) => (
           <a
            role="menuitem"
            href={menuItem.link}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            {menuItem.label}
          </a>
          ))}
        </div>
      )}
    </div>
  );
};
