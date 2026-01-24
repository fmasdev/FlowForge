// src/components/modal/ModalBtn.tsx

import { JSX } from "react";
import { SvgIcon } from "@/components/SvgIcon";
import { IconName } from "@/assets/svg";

export interface ModalBtnProps {
  className: string;
  title?: string;
  label?: string;
  iconName?: IconName
  onClick: () => void
}

export const ModalBtn: React.FC<ModalBtnProps> = ({
  className,
  title,
  label,
  iconName,
  onClick,
}: ModalBtnProps ): JSX.Element  => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      title={title ? title : ''}
    >
      {label ?? (
        <span>{label}</span>
      )}
      
      {iconName && (
        <SvgIcon
          name={iconName}
          size="lg"
        />
      )}
    </button>
  );
}