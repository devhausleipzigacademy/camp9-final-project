import InputField from '../components/InputField';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputField> = {
  title: 'components/InputField',
  component: InputField,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Placeholder: Story = {
  args: {
    label: 'Custom Label',
    placeholder: 'Custom Placeholder',
    type: 'text',
    width: 'full',
    disabled: false,
  },
};
