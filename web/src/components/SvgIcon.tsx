// src/components/SvgIcon.tsx

'use client';

import React, { JSX } from 'react';
import { InfoIcon } from '../assets/svg/InfoIcon';
import { SuccessIcon } from '../assets/svg/SuccessIcon';
import { ErrorIcon } from '../assets/svg/ErrorIcon';
import { OpenEyeIcon } from '../assets/svg/OpenEyeIcon';
import { ClosedEyeIcon } from '../assets/svg/ClosedEyeIcon';
import { UserIcon } from '../assets/svg/UserIcon';
import { FlowForgeIcon } from '@/assets/svg/FlowForgeIcon';

export type IconName = 'info' | 'success' | 'error' | 'openEye' | 'closedEye' | 'user' | 'flowforge';

type IconColor = 'info' | 'success' | 'danger' | 'default';

interface SvgIconProps {
  name: IconName;
  className?: string;
  color?: IconColor;
  size?: 'sm' | 'md' | 'lg';
}

const svgIcons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  info: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  openEye: OpenEyeIcon,
  closedEye: ClosedEyeIcon,
  user: UserIcon,
  flowforge: FlowForgeIcon,
};

// mapping de couleur Tailwind
const colorClasses: Record<IconColor, string> = {
  info: 'text-blue-500',
  success: 'text-green-500',
  danger: 'text-red-500',
  default: 'text-gray-500',
};

// mapping taille Tailwind
const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export const SvgIcon = ({
  name,
  className = '',
  color = 'default',
  size = 'md',
}: SvgIconProps): JSX.Element => {
  const Svg = svgIcons[name];
  const colorClass = colorClasses[color];
  const sizeClass = sizeClasses[size];

  return <Svg className={`${sizeClass} ${colorClass} ${className}`} />;
};
