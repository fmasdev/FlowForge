// src/components/Cta/Cta.tsx

'use client';

import { JSX } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './Cta.module.css';
import { SvgIcon } from '@/components/SvgIcon';
import { BackgroundVariant, CtaProps } from '@/components/cta/Cta.types';

export const Cta = ({
  link,
  label,
  type = 'button',
  icon,
  img,
  variant = 'default',
  isActive = false,
  backgroundVariant,
  onClick,
}: CtaProps): JSX.Element => {
  
  const bgClasses: Record<BackgroundVariant, string> = {
    default: 'bg-gray-700',
    info: 'bg-indigo-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-500',
    danger: 'bg-red-600',
  };

  const bgClass = backgroundVariant
    ? bgClasses[backgroundVariant]
    : undefined;

  const buttonClassName = clsx(
    styles.ctaBase,
    {
      [styles.defaultCta]: variant === 'default',
      [styles.navbarCta]: variant === 'navbar',
      [styles.formCta]: variant === 'form',
    },
    bgClass,
  );
  console.log(variant)
  console.log(buttonClassName)
  const content = (
    <>
      {icon &&
        <SvgIcon
          name={icon}
          className="flex items-center"
        />
      }
      {label &&
        <span>{label}</span>
      }
      {img &&
        <img
          src={img.src}
          alt={img.alt}
          className={img.className}
        />
      }
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        data-active={isActive}
        className={buttonClassName}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      data-active={isActive}
      className={buttonClassName}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
