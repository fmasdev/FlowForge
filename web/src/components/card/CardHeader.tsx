// src/components/card/CardHeader.tsx

'use client'

import { JSX, useEffect, useRef, useState } from "react";
import { SvgIcon } from "@/components/SvgIcon";
import { CardHeaderProps } from "@/components/card/Card.types";
import clsx from "clsx";

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  subtitleTooltip,
  displayActions,
  displayIsActiveIcon,
  isActiveIcon = false,
  isActiveTitle,
  isNotActiveTitle,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  onEdit,
  onDelete,
}: CardHeaderProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activeIconClassName: string = clsx(
    'h-3 w-3 rounded-full',
    {
      'bg-red-700': !isActiveIcon,
      'bg-green-700': isActiveIcon,
      'mr-[24px]': !displayActions
    }
  )

  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <div>
        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>
        {subtitle && (
          <h4
            title={subtitleTooltip ? subtitleTooltip : undefined}
            className="text-gray-400 text-sm font-medium"
          >
            {subtitle}
          </h4>
        )}
      </div>

      <div className="flex items-center">
        {!!displayIsActiveIcon && (
          <div className="mr-2">
              <div
                className={`${activeIconClassName}`}
                title={isActiveIcon ? isActiveTitle : isNotActiveTitle}
              ></div>
          </div>
        )}

        {!!displayActions && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-md text-gray-400 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <SvgIcon name="ellipsisVertical" size="md" />
            </button>

            {open && (
              <div className="absolute right-0 z-10 mt-2 w-32 rounded-md border border-white/10 bg-gray-800 shadow-lg">
                <button
                  onClick={() => {
                    setOpen(false);
                    onEdit?.();
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-white/10"
                >
                  {editLabel}
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    onDelete?.();
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
                >
                  {deleteLabel}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};