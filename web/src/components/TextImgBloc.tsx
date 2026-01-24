// src/components/TextImgBloc.tsx

'use client';

import React, { JSX } from 'react';
import clsx from 'clsx';
import { Cta } from '@/components/cta/Cta';

export type TextBlockCta = {
  text: string;
  link?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};

export interface TextImgBlockProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  ctas?: TextBlockCta[];
  className?: string;
}

export interface TextImgBlocType extends TextImgBlockProps {}

export const TextImgBlock = ({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  ctas = [],
  className,
}: TextImgBlockProps): JSX.Element => {
  const hasImage: boolean = !!imageSrc;

  return (
    <section
      className={clsx(
        'flex flex-col md:flex-row items-center gap-8 py-12',
        className,
      )}
    >
      {hasImage && imagePosition === 'left' && (
        <div className="md:w-1/2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      <div className={clsx('flex-1', hasImage ? 'md:w-1/2' : 'w-full')}>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{description}</p>

        {ctas.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {ctas.map((cta, idx) => (
              <Cta
                key={idx}
                label={cta.text}
                link={cta.link}
                onClick={cta.onClick}
              />
            ))}
          </div>
        )}
      </div>

      {hasImage && imagePosition === 'right' && (
        <div className="md:w-1/2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </section>
  );
};
