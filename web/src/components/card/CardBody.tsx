// src/components/card/CardBody.tsx

import { CardBodyProps } from "@/components/card/Card.types";

export const CardBody = ({
  children,
  className,
}: CardBodyProps) => (
  <div className={ `px-4 py-3 text-sm text-gray-300 ${className}` }>
    {children}
  </div>
);