import './CalendarViewSlider.css';

import React, { useState } from 'react';
import { addMonths } from 'date-fns';

import { cn } from '../../../utils/bem';
import { CalendarMount } from '../CalendarMount/CalendarMount';
import { CalendarMountLabel } from '../CalendarMountLabel/CalendarMountLabel';
import { CalendarSlider } from '../CalendarSlider/CalendarSlider';
import {
  Calendar,
  getdaysOfWeek,
  getHandleSelectDate,
  getMonthDays,
  getMonthTitle,
} from '../helpers';

const cnCalendarViewSlider = cn('CalendarViewSlider');

export const CalendarViewSlider: Calendar = React.forwardRef((props, ref) => {
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
  // const [currentVisibleDate, setCurrentVisibleDate] = useState(currentVisibleDateProp);
  const [currentVisibleDate] = useState(currentVisibleDateProp);
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
  const mountLabel = getMonthTitle(currentVisibleDate);
  const nextMountLabel = getMonthTitle(addMonths(currentVisibleDate, 1));
  const daysOfWeek = getdaysOfWeek();
  // const nextMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  // const prevMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewSlider({}, [className])}>
      <CalendarSlider
        className={cnCalendarViewSlider('Slider')}
        currentVisibleDate={currentVisibleDate}
      />
      <div className={cnCalendarViewSlider('CalendarsWrapper')}>
        <div className={cnCalendarViewSlider('Calendar')}>
          <CalendarMountLabel label={mountLabel} />
          <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={monthWeeks} />
        </div>
        <div className={cnCalendarViewSlider('Calendar')}>
          <CalendarMountLabel label={nextMountLabel} />
          <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={nextMonthWeeks} />
        </div>
      </div>
    </div>
  );
});
