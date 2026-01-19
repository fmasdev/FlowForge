// src/app/page.tsx

'use client';

import CtaButton from '@/components/CtaButton';
import { TextBlock } from '@/components/TextImgBloc';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const page = () => {
  const { t } = useTranslation('home');

  const homeContent = [
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
        <h1 className="text-5xl font-bold mb-6">
          {t('hero.title')}
        </h1>

        <div className="max-w-3xl mx-auto text-lg text-gray-600 mb-10">
          <ReactMarkdown>
            {t('hero.text')}
          </ReactMarkdown>
        </div>

        <div className="flex justify-center gap-4">
          <CtaButton textContent={t('hero.cta1')} />
          <CtaButton textContent={t('hero.cta2')} />
        </div>
      </section>

      {homeContent &&
        homeContent.map((contentItem, index) => (
          <section className="container mx-auto px-6" key={index}>
            <TextBlock
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
};

export default page;
