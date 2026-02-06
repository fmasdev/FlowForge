// src/components/notification/Notification.stories.tsx

'use client';

import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
};
export default meta;

type Story = StoryObj<typeof Notification>;

export const Info: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Notification
        type="info"
        message="Ceci est une notification d'information."
        onClose={() => setVisible(false)}
      />
    ) : null;
  },
};

export const Success: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Notification
        type="success"
        message="Opération réussie !"
        onClose={() => setVisible(false)}
      />
    ) : null;
  },
};

export const Danger: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Notification
        type="error"
        message="Une erreur est survenue."
        onClose={() => setVisible(false)}
      />
    ) : null;
  },
};
