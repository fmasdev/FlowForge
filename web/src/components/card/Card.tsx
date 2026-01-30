// src/components/card/Card.tsx

import { Children, isValidElement, JSX } from "react";
import { CardProps } from "@/components/card/Card.types";
import { CardHeader } from "@/components/card/CardHeader";
import { CardBody } from "@/components/card/CardBody";
import { CardFooter } from "@/components/card/CardFooter";

export const Card: React.FC<CardProps> = ({
  children,
  className,
}: CardProps): JSX.Element => {
  const items = Children.toArray(children)
  const cardHeader = items.find((child) =>
    isValidElement(child) && child.type === CardHeader)
  const cardBody = items.find((child) => isValidElement(child) && child.type === CardBody)
  const cardFooter = items.find((child) => isValidElement(child) && child.type === CardFooter)
  
  if (!cardBody) {
    throw new Error('Card must contains a CardBody')
  }

  if (items.length > 3) {
    throw new Error('Card accepts only CardHeader, CardBody, CardFooter')
  }

  return (
    <div className={`flex-1 min-w-[280px] rounded-lg border border-white/10 bg-gray-900 shadow-sm ${className}`}>
      {cardHeader}
      {cardBody}
      {cardFooter}
    </div>
  )
};