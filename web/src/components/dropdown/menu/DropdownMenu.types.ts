// src/components/dropdown/menu/DropdownMenu.types.ts

import { IconName } from "@/components/SvgIcon";

export interface MenuItem {
  label: string;
  link?: string;
  iconName?: IconName;
  isActive: boolean;
  variant?: 'default' | 'navbar';
  onClick?: () => void;
}

export interface DropdownMenuProps {
  menuItems: MenuItem[];
  label?: string;
  iconName?: IconName;
  variant?: 'default' | 'navbar';
}

export interface DropDownMenuType extends DropdownMenuProps {}