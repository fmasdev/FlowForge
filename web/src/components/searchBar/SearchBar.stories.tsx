// src/components/searchBar/SearchBar.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'UI/Form/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: { control: 'text' },
    initialValue: { control: 'text' },
    clearLabel: { control: 'text' },
    searchCharMin: { control: { type: 'number', min: 1 } },
    onSearch: { action: 'onSearch' },
    onClearSearch: { action: 'onClearSearch' },
  },
  args: {
    placeholder: 'Search...',
    initialValue: '',
    clearLabel: 'Clear search',
    searchCharMin: 2,
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

// -------------------------------------
// Stories
// -------------------------------------

export const Playground: Story = {
  render: (args: React.ComponentProps<typeof SearchBar>) => {
    const [results, setResults] = useState<string | null>(null);

    const handleSearch = (value: string) => {
      setResults(value ? `Searched for: ${value}` : null);
      args.onSearch(value); // déclenche l’action storybook
    };

    const handleClear = () => {
      setResults(null);
      args.onClearSearch();
    };

    return (
      <div className="w-full p-8 bg-gray-900 min-h-screen flex flex-col items-center gap-4">
        <SearchBar
          {...args}
          onSearch={handleSearch}
          onClearSearch={handleClear}
        />
        {results && (
          <p className="text-gray-200">{results}</p>
        )}
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  args: {
    initialValue: 'Initial query',
  },
};

export const MinChar4: Story = {
  args: {
    searchCharMin: 4,
  },
};

export const PlaceholderOnly: Story = {
  args: {
    placeholder: 'Type to search...',
    initialValue: '',
  },
};