import InputField from '../components/InputField';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputField> = {
  title: 'InputFieldExample',
  component: InputField,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: { label: 'Custom Label', type: 'text', width: 'full', disabled: false },
};

export const Placeholder: Story = {
  args: {
    label: 'Custom Label',
    placeholder: 'Custom Placeholder',
    type: 'text',
    width: 'full',
    disabled: false,
  },
};

export const disabled: Story = {
  args: {
    label: 'Custom Label',
    type: 'text',
    width: 'full',
    disabled: true,
  },
};

export const width: Story = {
  args: {
    label: 'Custom Label',
    type: 'text',
    width: 'reduced',
    disabled: false,
  },
};

export const WithError: Story = {
  args: {
    label: 'Custom Label',
    type: 'password',
    width: 'full',
    error: { message: 'Error message' },
    disabled: false,
  },
};

export const WithMax: Story = {
  args: {
    label: 'Custom Label',
    type: 'password',
    width: 'full',
    max: 3,
    disabled: false,
  },
};
