// src/components/modal/ModalHeader.tsx

import { JSX } from "react";
import { ModalHeaderProps } from "@/components/modal/Modal.types";
import { SvgIcon } from "@/components/SvgIcon";

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  closeBtn = true,
  onClose,
}: ModalHeaderProps): JSX.Element => {
  return (
    <div className="flex items-start justify-between border-b border-white/10 px-4 py-3">
      <div>
        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-0.5 text-sm text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {closeBtn && (
        <button
          type="button"
          onClick={onClose}
          className="ml-3 rounded-md p-1 text-gray-400 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Close modal"
        >
          <SvgIcon
            name="close"
            size="sm"
          />
        </button>
      )}
    </div>
  );
};

