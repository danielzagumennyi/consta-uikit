import * as React from 'react';

import { createMetadata } from '../../../utils/storybook';
import { Calendar } from '../Calendar';

import mdx from './Calendar.mdx';

export function Playground() {
  return <Calendar />;
}

export default createMetadata({
  title: 'Компоненты|/Calendar',
  id: 'components/Calendar',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
