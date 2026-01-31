// src/components/dropdown/menu/DropdownMenu.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI/Navigation/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconName: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    menuItems: {
      control: 'object',
    },
  },
  args: {
    iconName: 'ellipsis',
    variant: 'default',
    menuItems: [
      { label: 'Edit', link: '#' },
      { label: 'Duplicate', link: '#' },
      { label: 'Delete', link: '#' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

// -------------------------------------
// Stories
// -------------------------------------

export const Playground: Story = {
  render: (args: React.ComponentProps<typeof DropdownMenu>) => (
    <div className="h-64 flex items-start justify-end p-8 bg-gray-900">
      <DropdownMenu {...args} />
    </div>
  ),
};

export const WithDifferentIcon: Story = {
  args: {
    iconName: 'dotsVertical',
  },
  render: (args: React.ComponentProps<typeof DropdownMenu>) => (
    <div className="h-64 flex justify-center items-start p-8 bg-gray-900">
      <DropdownMenu {...args} />
    </div>
  ),
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
  },
  render: (args: React.ComponentProps<typeof DropdownMenu>) => (
    <div className="h-64 flex justify-center items-start p-8 bg-gray-900">
      <DropdownMenu {...args} />
    </div>
  ),
};

export const ManyItems: Story = {
  args: {
    menuItems: Array.from({ length: 10 }, (_, i) => ({
      label: `Action ${i + 1}`,
      link: '#',
    })),
  },
  render: (args: React.ComponentProps<typeof DropdownMenu>) => (
    <div className="h-64 flex justify-center items-start p-8 bg-gray-900">
      <DropdownMenu {...args} />
    </div>
  ),
};