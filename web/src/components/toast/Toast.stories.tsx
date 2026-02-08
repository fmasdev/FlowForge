// src/components/notification/Notification.stories.tsx

'use client';

import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Toast
        type="info"
        message="This is info toast."
        onClose={() => setVisible(false)}
      />
    ) : null;
  },
};

export const Success: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Toast
        type="success"
        message="Process successfull !"
        onClose={() => setVisible(false)}
      />
    ) : null;
  },
};

export const Danger: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Toast
        type="error"
        message="An unknown error has occurred."
        onClose={() => setVisible(false)}
      />
    ) : null;
  },
};
