// src/components/Cta/Cta.tsx

'use client';

import { JSX } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './Cta.module.css';
import { SvgIcon } from '@/components/SvgIcon';
import { CtaProps } from '@/components/cta/Cta.types';

export const Cta = ({
  link,
  label,
  icon,
  img,
  variant = 'default',
  isActive = false,
  onClick,
}: CtaProps): JSX.Element => {

  const baseClasses =
    'inline-flex items-center gap-2 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const buttonClassName = clsx(
    styles.ctaBase,
    {
      [styles.defaultCta]: variant === 'default',
      [styles.navbarCta]: variant === 'navbar',
    }
  );
  

  const content = (
    <>
      {icon &&
        <SvgIcon
          name={icon}
          classname="flex items-center"
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
      type="button"
      data-active={isActive}
      className={buttonClassName}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
