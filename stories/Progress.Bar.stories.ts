import ProgressBar from 'components/shared/ProgressBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressBar> = {
  title: 'ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    numberOfPages: 5,
  },
};

export const SecondPage: Story = {
  args: {
    currentPage: 2,
    numberOfPages: 5,
  },
};

export const ThirdPage: Story = {
  args: {
    currentPage: 3,
    numberOfPages: 5,
  },
};

export const FourthPage: Story = {
  args: {
    currentPage: 4,
    numberOfPages: 5,
  },
};

export const FifthPage: Story = {
  args: {
    currentPage: 5,
    numberOfPages: 5,
  },
};
