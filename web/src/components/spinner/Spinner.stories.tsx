// src/components/spinner/Spinner.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { SpinnerProps } from '@/components/spinner/Spinner.types';

const meta: Meta<typeof Spinner> = {
  title: 'Components/UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'white', 'gray'],
      description: 'Color variant of the spinner',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional Tailwind classes',
    },
  },
  args: {
    size: 'md',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// -------------------------------------
// Stories
// -------------------------------------

export const Default: Story = {};

export const Sizes: Story = {
  render: (args: SpinnerProps) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner décliné en différentes tailles.',
      },
    },
  },
};

export const Colors: Story = {
  render: (args: SpinnerProps) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} color="primary" />
      <Spinner {...args} color="gray" />
      <div className="bg-black p-2 rounded">
        <Spinner {...args} color="white" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Différentes variantes de couleur, y compris sur fond sombre.',
      },
    },
  },
};

export const InlineInButton: Story = {
  render: () => (
    <button
      disabled
      className="flex items-center gap-2 rounded bg-indigo-600 px-4 py-2 text-white"
    >
      <Spinner size="sm" color="white" />
      Chargement
    </button>
  ),
};

export const Centered: Story = {
  render: () => (
    <div className="flex h-40 items-center justify-center">
      <Spinner size="lg" />
    </div>
  ),
};