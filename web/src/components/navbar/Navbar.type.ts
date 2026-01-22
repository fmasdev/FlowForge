// src/components/navbar/Navbar.type.ts

import { CtaType } from "@/components/Cta/Cta.type";

export interface NavItem extends CtaType {
  link: string;
  label: string;
  isActive: boolean;
}