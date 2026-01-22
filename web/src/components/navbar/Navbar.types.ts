// src/components/navbar/Navbar.types.ts

import { CtaType } from "@/components/cta/Cta.types";

export interface NavItem extends CtaType {
  link: string;
  label: string;
  isActive: boolean;
}