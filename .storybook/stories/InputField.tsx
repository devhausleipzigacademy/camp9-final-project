import React from 'react';
import { storiesOf } from '@storybook/react';
import InputField from '../../components/InputField';
storiesOf('InputField', module)
  .add('Default', () =>
    React.createElement(InputField, {
      label: 'Custom Label',
      type: 'text',
      width: 'full',
      abled: true,
    })
  )
  .add('With custom label', () =>
    React.createElement(InputField, {
      label: 'Custom Label',
      type: 'text',
      width: 'full',
      abled: true,
    })
  )

  .add('With custom placeholder', () =>
    React.createElement(InputField, {
      label: 'Custom Label',
      placeholder: 'Custom Placeholder',
      type: 'text',
      width: 'full',
      abled: true,
    })
  )

  .add('disabled', () =>
    React.createElement(InputField, {
      label: 'Custom Label',
      type: 'text',
      width: 'full',
      abled: false,
    })
  )

  .add('With reduced width', () =>
    React.createElement(InputField, {
      label: 'Custom Label',
      type: 'text',
      width: 'reduced',
      abled: true,
    })
  )
  .add('With error', () =>
    React.createElement(InputField, {
      label: 'Custom Label',
      type: 'password',
      width: 'full',
      error: { message: 'Error message' },
      abled: true,
    })
  );
