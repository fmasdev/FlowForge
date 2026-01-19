// src/components/CtaButton.tsx

'use client';

import { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { MediaImg } from '@/types/media.types';

interface CtaButtonProps {
  link?: string;
  textContent?: string;
  icon?: ReactNode;
  img?: MediaImg;
  color?: 'primary' | 'secondary' | 'ternary' | 'success' | 'danger' | 'ghost';
  bgColor?: string;                           // tailwind classe or HEX code
  borderColor?: string;                       // tailwind classe or HEX code
  borderSize?: '0' | '1' | '2' | '4' | '8';   // border width scale
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'md' | 'full';
  isBtn?: boolean;                            // true = full button , false = only text
  hoverClass?: string,                        // optional custom hover
  isActive?: boolean,
  activeClass?: string,
  onClick?: () => void;
}

export interface CtaButtonType extends CtaButtonProps {};

export const CtaButton = ({
  link,
  textContent,
  icon,
  img,
  color = 'primary',
  bgColor,
  borderColor,
  borderSize = '1',
  size = 'md',
  rounded = 'md',
  isBtn = true,
  hoverClass,
  isActive = false,
  activeClass,
  onClick,
}: CtaButtonProps): JSX.Element => {
  const baseClasses =
    'inline-flex items-center gap-2 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  // Default color if isBtn
  const defaultBgColor = isBtn
    ? bgColor || {
        primary: 'bg-indigo-600',
        secondary: 'bg-gray-700',
        ternary: 'bg-gray-50',
        success: 'b-green-500',
        danger: 'bg-red-600',
        ghost: 'bg-transparent',
      }[color]
    : 'bg-transparent';

  const defaultTextColor = isBtn
    ? 'text-white'
    : {
        primary: 'text-indigo-600',
        secondary: 'text-gray-700',
        ternary: 'text-gray-50',
        success: 'text-green-500',
        danger: 'text-red-600',
        ghost: 'text-gray-300',
      }[color];

  const defaultHoverClass = isBtn
    ? {
        primary: 'hover:bg-indigo-500',
        secondary: 'hover:bg-gray-600',
        ternary: 'hover:bg-gray-400',
        success: 'hover:bg-green-400',
        danger: 'hover:bg-red-500',
        ghost: 'hover:bg-white/5',
      }[color]
    : {
        primary: 'hover:text-indigo-500',
        secondary: 'hover:text-gray-600',
        ternary: 'hover:text-gray-400',
        success: 'hover:text-green-400',
        danger: 'hover:text-red-500',
        ghost: 'hover:text-white/80',
      }[color];

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const roundedClasses = {
    none: 'rounded-none',
    md: 'rounded-md',
    full: 'rounded-full',
  };

  const borderClasses = borderColor ? `border-${borderSize} border-[${borderColor}]` : '';

  const activeClasses = isActive 
    ? (activeClass ? activeClass : 'rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white')
    : undefined;

  const className = clsx(
    baseClasses,
    isActive ? activeClasses : defaultBgColor,
    isActive ? undefined : defaultTextColor,
    isActive ? undefined : hoverClass || defaultHoverClass,
    sizeClasses[size],
    isActive ? undefined : roundedClasses[rounded],
    borderClasses
  );

  const content = (
    <>
      {icon && <span className="flex items-center">{icon}</span>}
      {textContent && <span>{textContent}</span>}
      {img && (
        <img
          src={img.src}
          alt={img.alt}
          className={img.className}
        />
      )}
    </>
  );

  if (link) {
    return (
      <Link href={link} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}
