// import './CalendarOneMount.css';

import React from 'react';
import { add } from 'date-fns';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { CalendarMount } from '../CalendarMount/CalendarMount';
import { CalendarMountToggler } from '../CalendarMountToggler/CalendarMountToggler';
import {
  getdaysOfWeek,
  getHandleSelectDate,
  getMonthDays,
  getMouthLabelWithYear,
  TypeProp,
  ValueByType,
} from '../helpers';

export type CalendarOneMountProps<TYPE extends TypeProp> = PropsWithJsxAttributes<
  {
    currentVisibleDate?: Date;
    type: TYPE;
    value?: ValueByType<TYPE>;
    onChange?: (value: ValueByType<TYPE>) => void;
    minDate?: Date;
    maxDate?: Date;
  },
  'div'
>;

type CalendarOneMount = <TYPE extends TypeProp>(
  props: CalendarOneMountProps<TYPE>,
) => React.ReactElement | null;

const cnCalendarOneMount = cn('CalendarOneMount');

export const CalendarOneMount: CalendarOneMount = (props) => {
  const {
    className,
    type = 'date',
    minDate,
    maxDate,
    value,
    onChange,
    currentVisibleDate = add(new Date(), { months: 1 }),
    ...otherProps
  } = props;
  const handleSelectDate = getHandleSelectDate({ type, minDate, maxDate, value, onChange });
  const monthWeeks = getMonthDays({ date: currentVisibleDate, handleDayClick: handleSelectDate });
  const mountLabel = getMouthLabelWithYear(currentVisibleDate);
  const daysOfWeek = getdaysOfWeek();

  return (
    <div {...otherProps} className={cnCalendarOneMount({}, [className])} role="button">
      <CalendarMountToggler label={mountLabel} />
      <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={monthWeeks} />
    </div>
  );
};
