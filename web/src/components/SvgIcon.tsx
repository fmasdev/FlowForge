// src/components/SvgIcon.tsx

'use client';

import React, { JSX } from 'react';
import { svgIcons, IconName } from '@/assets/svg';

export type IconColor = 'info' | 'success' | 'danger' | 'default';

export interface SvgIconProps {
  name: IconName;
  className?: string;
  color?: IconColor;
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

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
  rounded = false,
}: SvgIconProps): JSX.Element => {
  const Svg = svgIcons[name];

  return (
    <Svg
      className={[
        sizeClasses[size],
        colorClasses[color],
        rounded ? 'rounded-full' : '',
        className,
      ].join(' ')}
    />
  );
};
