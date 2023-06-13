import type { Meta, StoryObj } from '@storybook/react';
import PreviewCheckbox from 'components/PreviewCheckbox';

const meta: Meta<typeof PreviewCheckbox> = {
  title: 'Example/Preview checkbox',
  component: PreviewCheckbox,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof PreviewCheckbox>;

export const NotChecked: Story = {
  args: {
    isChecked: false,
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
  },
};
