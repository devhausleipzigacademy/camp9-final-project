import React from 'react';
import { storiesOf } from '@storybook/react';
import InputField from '../../components/InputField';
storiesOf('InputField', module)
  .add('Default', () =>
    React.createElement(InputField, {
      id: 'default',
      type: 'text',
      width: 'full',
      abled: 'true',
    })
  )
  .add('With custom label', () =>
    React.createElement(InputField, {
      label: 'Custom Label',
      id: 'default',
      type: 'text',
      width: 'full',
      abled: 'true',
    })
  )

  .add('With custom placeholder', () =>
    React.createElement(InputField, {
      placeholder: 'Custom Placeholder',
      id: 'default',
      type: 'text',
      width: 'full',
      abled: 'true',
    })
  )

  .add('With custom max', () =>
    React.createElement(InputField, {
      max: 40,
      id: 'default',
      type: 'text',
      width: 'full',
      abled: 'true',
    })
  )

  .add('With reduced width', () =>
    React.createElement(InputField, {
      id: 'default',
      type: 'text',
      width: 'reduced',
      abled: 'true',
    })
  )

  .add('With disabled', () =>
    React.createElement(InputField, {
      id: 'default',
      type: 'text',
      width: 'full',
      abled: 'false',
    })
  );
