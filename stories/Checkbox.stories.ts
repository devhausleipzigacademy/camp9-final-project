import { Checkboxinput } from '@/components/CheckboxInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Checkboxinput> = {
  title: 'components/Box',
  component: Checkboxinput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Checkboxinput>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
// export const Secondary: Story = {
//   args: {
//     variant: 'secondary',
//   },
// };
// export const Tertiary: Story = {
//   args: {
//     variant: 'tertiary',
//   },
// };
