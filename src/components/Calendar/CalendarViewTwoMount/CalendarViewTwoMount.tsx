import './CalendarViewTwoMount.css';

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

const cnCalendarViewTwoMount = cn('CalendarViewTwoMount');

export const CalendarViewTwoMount: Calendar = React.forwardRef((props, ref) => {
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

  const nextMonthWeeks = getMonthDays({
    date: addMonths(currentVisibleDate, 1),
    handleDayClick: handleSelectDate,
    value,
    events,
  });

  const mountLabel = getMouthLabelWithYear(currentVisibleDate);

  const nextMountLabel = getMouthLabelWithYear(addMonths(currentVisibleDate, 1));

  const daysOfWeek = getdaysOfWeek();
  const nextMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewTwoMount({}, [className])}>
      <div className={cnCalendarViewTwoMount('Calendar')}>
        <CalendarMountToggler prevOnClick={prevMountHandle} label={mountLabel} />
        <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={monthWeeks} />
      </div>
      <div className={cnCalendarViewTwoMount('Calendar')}>
        <CalendarMountToggler nextOnClick={nextMountHandle} label={nextMountLabel} />
        <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={nextMonthWeeks} />
      </div>
    </div>
  );
});
