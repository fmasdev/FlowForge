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

export type Header = ReactElement<typeof CardHeader>;
export type Body = ReactElement<typeof CardBody>;
export type Footer = ReactElement<typeof CardFooter>;

export type CardChildren =
  | []
  | [Body]
  | [Header, Body]
  | [Header, Footer]
  | [Body, Footer]
  | [Header, Body, Footer]