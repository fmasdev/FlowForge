// src/components/card/Card.stories.tsx

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';

const meta: Meta<typeof Card> = {
  title: 'Components/UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// -------------------------------------
// Stories
// -------------------------------------

export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader
        title="Workflow title"
        subtitle="Workflow subtitle"
      />
      <CardBody>
        Contenu principal de la carte.  
        Peut contenir du texte, des formulaires ou autre.
      </CardBody>
      <CardFooter>
        <span>Footer content</span>
      </CardFooter>
    </Card>
  ),
};

export const BodyOnly: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardBody>
        Carte minimale avec uniquement un body.
      </CardBody>
    </Card>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader
        title="Workflow avec actions"
        subtitle="Editable"
        displayActions
        onEdit={() => alert('Edit clicked')}
        onDelete={() => alert('Delete clicked')}
      />
      <CardBody>
        Cette carte expose le menu d’actions dans le header.
      </CardBody>
    </Card>
  ),
};

export const WithActiveState: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader
        title="Workflow status"
        subtitle="Production"
        displayIsActiveIcon
        isActiveIcon
        isActiveTitle="Active"
        isNotActiveTitle="Inactive"
      />
      <CardBody>
        Indicateur d’état visible dans le header.
      </CardBody>
    </Card>
  ),
};

export const InactiveWithActions: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader
        title="Workflow disabled"
        subtitle="Paused"
        displayIsActiveIcon
        isActiveIcon={false}
        isActiveTitle="Active"
        isNotActiveTitle="Inactive"
        displayActions
        onEdit={() => alert('Edit')}
        onDelete={() => alert('Delete')}
      />
      <CardBody>
        Cas réel : workflow inactif avec actions possibles.
      </CardBody>
      <CardFooter>
        Dernière modification : il y a 2 jours
      </CardFooter>
    </Card>
  ),
};