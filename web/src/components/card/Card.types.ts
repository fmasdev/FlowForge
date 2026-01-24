// src/components/card/Card.types.ts

import { ReactElement } from "react";
import { CardHeader } from "@/components/card/CardHeader";
import { CardBody } from "@/components/card/CardBody";
import { CardFooter } from "@/components/card/CardFooter";

export interface CardProps {
  children?: CardChildren;
}

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  subtitleTooltip?: string;
  displayActions?: boolean;
  editLabel?: string;
  deleteLabel?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface CardBodyProps {
  children: React.ReactNode;
}

export interface CardFooterProps {
  children: React.ReactNode;
}

export type CardHeader = ReactElement<typeof CardHeader>;
export type CardBody = ReactElement<typeof CardBody>;
export type CardFooter = ReactElement<typeof CardFooter>;

export type CardChildren =
  | []
  | [Body]
  | [CardHeader, CardBody]
  | [CardHeader, CardFooter]
  | [CardBody, CardFooter]
  | [CardHeader, CardBody, CardFooter]