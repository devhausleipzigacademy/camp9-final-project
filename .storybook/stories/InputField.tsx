import React from 'react';
import { storiesOf } from '@storybook/react';
import InputField from '../../components/InputField';
storiesOf('InputField', module)
  .add('Default', () =>
    React.createElement(InputField, {
      label: 'Default InputField',
      id: 'default',
    })
  )
  .add('With custom label', () =>
    React.createElement(InputField, { label: 'Custom Label', id: 'custom' })
  );
