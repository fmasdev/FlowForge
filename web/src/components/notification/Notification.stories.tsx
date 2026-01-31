// src/components/notification/Notification.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/UI/Notification',
  component: Notification,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'danger'],
    },
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'bottom-center'],
    },
    message: {
      control: 'text',
    },
  },
  args: {
    type: 'info',
    position: 'bottom-right',
    message: 'This is an information notification.',
  },
};

export default meta;

type Story = StoryObj<typeof Notification>;

// -------------------------------------
// Stories
// -------------------------------------

export const Info: Story = {
  args: {
    type: 'info',
    message: 'Information message',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Operation completed successfully',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    message: 'Something went wrong',
  },
};

export const BottomRight: Story = {
  args: {
    position: 'bottom-right',
    message: 'Bottom right notification',
  },
};

export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
    message: 'Bottom left notification',
  },
};

export const BottomCenter: Story = {
  args: {
    position: 'bottom-center',
    message: 'Bottom center notification',
  },
};

export const Playground: Story = {
  render: (args: React.ComponentProps<typeof Notification>) => (
    <Notification key={JSON.stringify(args)} {...args} />
  ),
};