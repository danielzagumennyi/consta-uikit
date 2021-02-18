import './Calendar.css';

import React, { useState } from 'react';

import { cn } from '../../utils/bem';
import { DateRange } from '../../utils/types/Date';

import { CalendarViewOneMount } from './CalendarViewOneMount/CalendarViewOneMount';
import { CalendarViewSlider } from './CalendarViewSlider/CalendarViewSlider';
import { CalendarViewTwoMount } from './CalendarViewTwoMount/CalendarViewTwoMount';

type CalendarProps = {
  children?: never;
};

const cnCalendar = cn('Calendar');

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const [value, setValue] = useState<DateRange>();
  return (
    <div className={cnCalendar()} ref={ref}>
      <CalendarViewOneMount
        type="date-range"
        onChange={setValue}
        value={value}
        events={[new Date()]}
      />
      <CalendarViewTwoMount
        type="date-range"
        onChange={setValue}
        value={value}
        events={[new Date()]}
      />
      <CalendarViewSlider
        type="date-range"
        onChange={setValue}
        value={value}
        events={[new Date()]}
      />
    </div>
  );
});
