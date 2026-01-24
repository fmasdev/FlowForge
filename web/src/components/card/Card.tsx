// src/components/card/Card.tsx

import { JSX } from "react";
import { CardProps } from "@/components/card/Card.types";

export const Card = ({
  children,
}: CardProps): JSX.Element => (
  <div className="rounded-lg border border-white/10 bg-gray-900 shadow-sm">
    {children}
  </div>
);