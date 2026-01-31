// src/components/cta/Cta.stories.tsx

'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Cta } from './Cta';

const meta: Meta<typeof Cta> = {
  title: 'Components/UI/Cta',
  component: Cta,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'navbar'] },
    icon: { control: 'select', options: ['search','arrowRight','arrowLeft','ellipsisVertical'] as IconName[] },
    isActive: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Cta>;

// -------------------------------------
// Stories
// -------------------------------------

export const Default: Story = {
  args: {
    label: 'Click me',
    variant: 'default',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    icon: 'search',
    variant: 'default',
  },
};

export const NavbarVariant: Story = {
  args: {
    label: 'Menu',
    variant: 'navbar',
  },
};

export const ActiveState: Story = {
  args: {
    label: 'Active button',
    variant: 'default',
    isActive: true,
  },
};

export const AsLink: Story = {
  args: {
    label: 'Go to Home',
    link: '/',
    variant: 'default',
  },
};

export const WithImage: Story = {
  args: {
    label: 'Profile',
    img: { src: '/avatar.png', alt: 'Avatar', className: 'w-6 h-6 rounded-full' },
  },
};