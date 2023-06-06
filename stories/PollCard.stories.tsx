import { Meta } from '@storybook/react';

import PollCard from '../components/PollCard';
import React from 'react';

const meta: Meta<typeof PollCard> = {
  title: 'PollCard',
  component: PollCard,
};

export default meta;

export const Default = () => <PollCard />;
