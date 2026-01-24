// src/components/modal/ModalFooter.tsx

import { JSX } from "react";
import { ModalFooterProps } from "@/components/modal/Modal.types";

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children
}: ModalFooterProps): JSX.Element => (
  <div className="flex justify-end gap-2 border-t border-white/10 px-4 py-3">
    {children}
  </div>
);