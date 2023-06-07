import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from '../../components/Checkbox';

storiesOf('Checkbox', module)
  .add('Default', () => (
    <Checkbox
      label="Click me"
      onChange={checked => console.log(`Checkbox state: ${checked}`)}
    />
  ))
  .add('With custom label', () => (
    <Checkbox
      label="Custom Label"
      onChange={checked => console.log(`Checkbox state: ${checked}`)}
    />
  ));
