// src/app/page.tsx

'use client';

import { Cta } from '@/components/cta/Cta';
import { TextImgBlock, type TextImgBlocType } from '@/components/TextImgBloc';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

export default function Page(): JSX.Element {
  const { t } = useTranslation('home');

  const homeContent: TextImgBlocType[] = [
    {
      title: t('objectives.title'),
      description: t('objectives.text'),
    },
    {
      title: t('features.title'),
      description: t('features.text'),
      imageSrc: '/images/workflow-editor.png',
      imageAlt: 'Workflow editor',
      imagePosition: 'right',
    },
    {
      title: t('concepts.title'),
      description: t('concepts.text'),
    },
    {
      title: t('design.title'),
      description: t('design.text'),
      imageSrc: '/images/execution-logs.png',
      imageAlt: 'Execution logs',
      imagePosition: 'left',
    },
    {
      title: t('orientation.title'),
      description: t('orientation.text'),
    },
    {
      title: t('closing.title'),
      description: t('closing.text'),
    },
  ];

  return (
    <>
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">{t('hero.title')}</h1>

        <div className="max-w-3xl mx-auto text-lg text-gray-600 mb-10">
          <ReactMarkdown>{t('hero.text')}</ReactMarkdown>
        </div>

        <div className="flex justify-center gap-4">
          <Cta label={t('hero.cta1')} />
          <Cta label={t('hero.cta2')} />
        </div>
      </section>

      {homeContent.map((contentItem, index) => (
        <section className="container mx-auto px-6"
key={index}
        >
          <TextImgBlock
            title={contentItem.title}
            description={contentItem.description}
            imageSrc={contentItem.imageSrc}
            imageAlt={contentItem.imageAlt}
            imagePosition="left"
          />
        </section>
      ))}
    </>
  );
}
