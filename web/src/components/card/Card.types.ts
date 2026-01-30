// src/components/card/Card.types.ts


export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  subtitleTooltip?: string;
  displayActions?: boolean;
  displayIsActiveIcon?: boolean;
  isActiveIcon?: boolean;
  isActiveTitle?: string;
  isNotActiveTitle?: string;
  editLabel?: string;
  deleteLabel?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
}
