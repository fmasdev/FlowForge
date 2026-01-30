// src/components/Cta/Cta.type.ts

import { IconName } from "@/assets/svg";
import { MediaImg } from "@/types/media.types";

export type BackgroundVariant = NonNullable<CtaProps['backgroundVariant']>;

export interface CtaProps {
  link?: string;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: IconName;
  img?: MediaImg;
  variant?: 'default' | 'navbar' | 'form';
  backgroundVariant?: 'default' | 'info' | 'success' | 'warning' | 'danger',
  isActive?: boolean;
  onClick?: () => void;
}

export interface CtaType extends CtaProps {}
