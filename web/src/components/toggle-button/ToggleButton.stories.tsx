// src/components/toggle-button/ToggleButton.stories.tsx

import type { Meta, StoryObj } from '@storybook/nextjs';
import ToggleButton from '@/components/toggle-button/ToggleButton';
import { ToggleButtonProps } from '@/components/toggle-button/ToggleButton.types';

const meta: Meta<ToggleButtonProps> = {
  title: 'Components/UI/ToggleButton',
  component: ToggleButton,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    onChange: {
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<ToggleButtonProps>;

// -------------------------------------
// Stories
// -------------------------------------

export const Disabled: Story = {
  args: {
    checked: true,
    label: 'Désactivé',
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};