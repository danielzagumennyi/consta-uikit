import './Calendar.css';

import React from 'react';

import { range } from '../../utils/array';
import { cn } from '../../utils/bem';

import { CalendarDay } from './CalendarDay/CalendarDay';
import { CalendarMount } from './CalendarMount/CalendarMount';
import { CalendarMountToggler } from './CalendarMountToggler/CalendarMountToggler';
import { CalendarCell } from './CalendarСell/CalendarСell';

type CalendarProps = {
  children?: never;
};

const daysOfMount = range(31).map((item) => ({
  number: item,
  event: true,
  range: true,
}));

const cnCalendar = cn('Calendar');

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  return (
    <div className={cnCalendar()} ref={ref}>
      <CalendarCell range>
        <CalendarDay number="28" event today selected />
      </CalendarCell>
      <CalendarMountToggler
        label="Январь 2020"
        nextOnClick={() => console.log('d')}
        prevOnClick={() => console.log('d')}
      />
      <CalendarMount
        daysOfWeek={['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']}
        daysOfMount={daysOfMount}
      />
    </div>
  );
});
