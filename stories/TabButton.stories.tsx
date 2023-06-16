import { Meta, StoryObj } from '@storybook/react';
import TabButton from '../components/shared/buttons/TabButton';

const meta: Meta<typeof TabButton> = {
  title: 'TabButton',
  component: TabButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TabButton>;

export const Default: Story = {
  args: {
    children: 'default',
  },
};

export const DefaultInactive: Story = {
  args: {
    children: 'default',
  },
};

export const New: Story = {
  args: {
    children: 'new',
  },
};

export const NewInactive: Story = {
  args: {
    children: 'new',
  },
};

export const Pending: Story = {
  args: {
    children: 'pending',
  },
};

export const PendingInactive: Story = {
  args: {
    children: 'pending',
  },
};

export const Closed: Story = {
  args: {
    children: 'closed',
  },
};

export const ClosedInactive: Story = {
  args: {
    children: 'closed',
  },
};

// my polls
export const MyPolls: Story = {
  args: {
    children: 'my polls',
  },
};

export const MyPollsInactive: Story = {
  args: {
    children: 'my polls',
  },
};
