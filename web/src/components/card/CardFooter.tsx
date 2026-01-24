// src/components/card/CardFooter.tsx

import { JSX } from "react";
import { CardFooterProps } from "@/components/card/Card.types";

export const CardFooter = ({
  children
}: CardFooterProps): JSX.Element => (
  <div className="border-t border-white/10 px-4 py-3 text-sm text-gray-400">
    {children}
  </div>
);