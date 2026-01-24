// src/components/modal/ModalBody.tsx

import { JSX } from "react";
import { ModalBodyProps } from "@/components/modal/Modal.types";

export const ModalBody: React.FC<ModalBodyProps> = ({
  children
}: ModalBodyProps): JSX.Element => (
  <div className="px-4 py-4 text-sm text-gray-300">
    {children}
  </div>
);