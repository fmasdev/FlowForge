// src/components/Cta/Cta.type.ts

import { IconName } from "@/components/SvgIcon";
import { MediaImg } from "@/types/media.types";

export interface CtaProps {
  link?: string;
  label?: string;
  icon?: IconName;
  img?: MediaImg;
  variant?: 'default' | 'navbar';
  isActive?: boolean;
  onClick?: () => void;
}

export interface CtaType extends CtaProps {}
