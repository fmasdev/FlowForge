// src/components/pagination/Pagination.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    totalItems: {
      control: { type: 'number', min: 0 },
    },
    pageSize: {
      control: { type: 'number', min: 1 },
    },
    limit: {
      control: { type: 'number', min: 3, max: 9 },
    },
    currentPage: {
      table: {
        disable: true, // contrôlé par la story
      },
    },
    onPageChange: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    totalItems: 124,
    pageSize: 10,
    limit: 7,
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

// -------------------------------------
// Stories
// -------------------------------------

export const Playground: Story = {
  render: (args: React.ComponentProps<typeof Pagination>) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="min-h-screen flex flex-col justify-end bg-gray-900">
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const FirstPage: Story = {
  render: (args: React.ComponentProps<typeof Pagination>) => (
    <Pagination
      {...args}
      currentPage={1}
      onPageChange={() => {}}
    />
  ),
};

export const MiddlePage: Story = {
  render: (args: React.ComponentProps<typeof Pagination>) => (
    <Pagination
      {...args}
      currentPage={6}
      onPageChange={() => {}}
    />
  ),
};

export const LastPage: Story = {
  render: (args: React.ComponentProps<typeof Pagination>) => {
    const totalPages = Math.ceil(args.totalItems / args.pageSize);

    return (
      <Pagination
        {...args}
        currentPage={totalPages}
        onPageChange={() => {}}
      />
    );
  },
};

export const FewPages: Story = {
  args: {
    totalItems: 30,
    pageSize: 10,
  },
  render: (args: React.ComponentProps<typeof Pagination>) => (
    <Pagination
      {...args}
      currentPage={1}
      onPageChange={() => {}}
    />
  ),
};