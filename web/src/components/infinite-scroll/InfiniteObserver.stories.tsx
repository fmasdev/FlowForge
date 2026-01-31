// src/components/infinite-scroll/InfiniteObserver.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useCallback } from 'react';
import { InfiniteObserver } from './InfiniteObserver';

const meta: Meta<typeof InfiniteObserver> = {
  title: 'Components/UI/InfiniteObserver',
  component: InfiniteObserver,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    hasMore: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    rootMargin: {
      control: 'text',
    },
    threshold: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
    },
  },
  args: {
    hasMore: true,
    isLoading: false,
    rootMargin: '200px',
    threshold: 0,
  },
};

export default meta;

type Story = StoryObj<typeof InfiniteObserver>;

// -------------------------------------
// Stories
// -------------------------------------

export const Playground: Story = {
  render: (args: React.ComponentProps<typeof InfiniteObserver>) => {
    const [items, setItems] = useState<number[]>(() =>
      Array.from({ length: 20 }, (_, i) => i + 1)
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = useCallback(() => {
      setIsLoading(true);

      setTimeout(() => {
        setItems((prev) => [
          ...prev,
          ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1),
        ]);
        setIsLoading(false);
      }, 1000);
    }, []);

    return (
      <div className="h-screen overflow-auto p-4 border">
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="h-16 flex items-center justify-center bg-gray-100 rounded"
            >
              Item {item}
            </li>
          ))}
        </ul>

        {args.hasMore && (
          <>
            {isLoading && (
              <div className="py-4 text-center text-sm text-gray-500">
                Loading…
              </div>
            )}

            <InfiniteObserver
              {...args}
              isLoading={isLoading}
              onLoadMore={handleLoadMore}
            />
          </>
        )}
      </div>
    );
  },
};