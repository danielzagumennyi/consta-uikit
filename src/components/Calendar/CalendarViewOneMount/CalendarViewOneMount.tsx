import React, { useState } from 'react';
import { addMonths } from 'date-fns';

import { cn } from '../../../utils/bem';
import { CalendarMount } from '../CalendarMount/CalendarMount';
import { CalendarMountToggler } from '../CalendarMountToggler/CalendarMountToggler';
import {
  Calendar,
  getdaysOfWeek,
  getHandleSelectDate,
  getMonthDays,
  getMouthLabelWithYear,
} from '../helpers';

const cnCalendarViewOneMount = cn('CalendarViewOneMount');

export const CalendarViewOneMount: Calendar = React.forwardRef((props, ref) => {
  const {
    className,
    type = 'date',
    minDate,
    maxDate,
    value,
    onChange,
    currentVisibleDate: currentVisibleDateProp = new Date(),
    events,
    ...otherProps
  } = props;
  const [currentVisibleDate, setCurrentVisibleDate] = useState(currentVisibleDateProp);
  const handleSelectDate = getHandleSelectDate({ type, minDate, maxDate, value, onChange });
  const monthWeeks = getMonthDays({
    date: currentVisibleDate,
    handleDayClick: handleSelectDate,
    value,
    events,
  });

  const mountLabel = getMouthLabelWithYear(currentVisibleDate);
  const daysOfWeek = getdaysOfWeek();
  const nextMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewOneMount({}, [className])}>
      <CalendarMountToggler
        prevOnClick={prevMountHandle}
        nextOnClick={nextMountHandle}
        label={mountLabel}
      />
      <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={monthWeeks} />
    </div>
  );
});
