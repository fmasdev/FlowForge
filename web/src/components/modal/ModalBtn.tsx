// src/components/modal/ModalBtn.tsx

import { JSX } from "react";
import { SvgIcon } from "@/components/SvgIcon";
import { ModalBtnProps } from "@/components/modal/Modal.types";

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